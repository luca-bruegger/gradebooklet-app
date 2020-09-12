import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from '../../assets/fonts/custom-fonts';
import {Module} from '../models/module';
import {DatePipe} from '@angular/common';
import {Platform} from '@ionic/angular';
import {File} from '@ionic-native/file';
import {FileOpener} from '@ionic-native/file-opener/ngx';
import {TranslateService} from '@ngx-translate/core';


pdfMake.vfs = pdfFonts.pdfMake.vfs;

export class PdfController {

    constructor(public datePipe: DatePipe,
                public plt: Platform,
                public file: File,
                public fileOpener: FileOpener,
                public translate: TranslateService,
                public modules: Module[]
    ) {
    }

    createPdf() {
        pdfMake.fonts = {
            Pacifico: {
                normal: 'Pacifico-Regular.ttf',
            },
            Roboto: {
                normal: 'Roboto-Regular.ttf',
                bold: 'Roboto-Medium.ttf',
                italics: 'Roboto-Italic.ttf',
                bolditalics: 'Roboto-Italic.ttf'
            }
        };

        const headers = {
            stack: [
                {text: 'gradebooklet', font: 'Pacifico'},
                {text: this.datePipe.transform(new Date(), 'dd.MM.yyyy'), style: 'subheader'},
            ],
            style: 'header'
        };

        const footers = [
            {text: 'gradebooklet ', font: 'Pacifico'},
            {text: ' | gradebooklet.com'}
        ];

        const tables = this.createTables();

        const dd = {
            footer: {
                columns: [
                    {text: footers, alignment: 'center'}
                ]
            },
            content: [
                headers,
                tables
            ],
            styles: {
                header: {
                    fontSize: 32,
                    alignment: 'right',
                    margin: [0, 60, 0, 80]
                },
                subheader: {
                    fontSize: 14
                },
                superMargin: {
                    margin: [20, 0, 40, 0],
                    fontSize: 15
                }
            }

        };

        const pdf = pdfMake.createPdf(dd);


        if (this.plt.is('cordova')) {
            try {
                pdf.getBase64(data => {
                    this.saveAndOpenPdf(data, 'gradebooklet.pdf');
                });
            } catch (error) {
                console.error('Unable to write file', error);
            }
        } else {
            pdf.download();
        }
    }

    saveAndOpenPdf(pdf: string, filename: string) {
        const writeDirectory = this.plt.is('ios') ? this.file.dataDirectory : this.file.externalDataDirectory;
        this.file.writeFile(writeDirectory, filename, this.convertBase64ToBlob(pdf, 'data:application/pdf;base64'), {replace: true})
            .then(() => {
                this.fileOpener.open(writeDirectory + filename, 'application/pdf')
                    .catch(() => {
                        console.log('Error opening pdf file');
                    });
            })
            .catch(() => {
                console.error('Error writing pdf file');
            });
    }

    convertBase64ToBlob(b64Data, contentType): Blob {
        contentType = contentType || '';
        const sliceSize = 512;
        b64Data = b64Data.replace(/^[^,]+,/, '');
        b64Data = b64Data.replace(/\s/g, '');
        const byteCharacters = window.atob(b64Data);
        const byteArrays = [];
        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        return new Blob(byteArrays, {type: contentType});
    }

    createTables() {
        const tables = [];
        if (this.modules.length == 1) {
            const currentTable = [];
            currentTable.push({
                    color: '#000000',
                    table: {
                        widths: [300, 100, '*'],
                        headerRows: 3,
                        body: this.createRows(this.modules[0])
                    },
                    layout: 'headerLineOnly',
                    unbreakable: true
                }
            );
            tables.push(currentTable);
        } else {
            this.modules.forEach(m => {
                const currentTable = [];
                currentTable.push({
                        color: '#000000',
                        table: {
                            widths: [300, 100, '*'],
                            headerRows: 3,
                            body: this.createRows(m)
                        },
                        layout: 'headerLineOnly',
                        unbreakable: true
                    }
                );
                tables.push(currentTable);
            });
        }
        return tables;
    }

    createRows(m: Module) {
        const rows = [];

        rows.push([{text: m.name, fontSize: 14, bold: true, margin: [20, 20, 0, 8]}, {}, {}],
            [{text: m.teacher, style: 'tableHeader', alignment: 'center', margin: [0, 5, 0, 10]},
                {text: m.building, style: 'tableHeader', alignment: 'center', margin: [0, 5, 0, 10]},
                {text: m.room, style: 'tableHeader', alignment: 'center', margin: [0, 5, 0, 10]}],
            [{text: this.translate.instant('module.exam_name'), style: 'tableHeader', alignment: 'center'},
                {text: this.translate.instant('module.date'), style: 'tableHeader', alignment: 'center'},
                {text: this.translate.instant('module.grade'), style: 'tableHeader', alignment: 'center'}]);

        m.exams.forEach(exam => {
            rows.push([{text: exam.name, alignment: 'center'}, {
                text: this.datePipe.transform(exam.date, 'dd.MM.yyyy'),
                alignment: 'center'
            }, {text: exam.grade, alignment: 'center'}]);
        });

        rows.push([{}, {
            text: this.translate.instant('module.average') + ':',
            alignment: 'center',
            margin: [0, 5, 0, 10]
        }, {text: m.average, alignment: 'center', bold: true, margin: [0, 5, 0, 10]}]);


        return rows;
    }
}
