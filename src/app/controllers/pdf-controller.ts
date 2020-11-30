import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from '../../assets/fonts/custom-fonts';
import {Module} from '../models/module';
import {DatePipe} from '@angular/common';
import {Platform} from '@ionic/angular';
import {FileOpener} from '@ionic-native/file-opener/ngx';
import {TranslateService} from '@ngx-translate/core';
import {FilesystemDirectory, Plugins} from '@capacitor/core';
import {Injectable} from "@angular/core";

const {Filesystem} = Plugins;

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable()
export class PdfController {
    constructor(public datePipe: DatePipe,
                public plt: Platform,
                public fileOpener: FileOpener,
                public translate: TranslateService) {
    }

    createPdf(modules: Module[]) {
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

        const tables = this.createTables(modules);

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
            pdf.getBase64(async data => {
                try {
                    let path = 'pdf/gradebooklet.pdf'

                    const result = await Filesystem.writeFile({
                        path,
                        data,
                        directory: FilesystemDirectory.Documents,
                        recursive: true
                    })
                    await this.fileOpener.open(`${result.uri}`, 'application/pdf')
                } catch (e) {
                    console.error('Unable to write file', e);
                }
            });
        } else {
            pdf.download();
        }
    }

    createTables(modules: Module[]) {
        const tables = [];
        if (modules.length == 1) {
            const currentTable = [];
            currentTable.push({
                    color: '#000000',
                    table: {
                        widths: [300, 100, '*'],
                        headerRows: 3,
                        body: this.createRows(modules[0])
                    },
                    layout: 'headerLineOnly',
                    unbreakable: true
                }
            );
            tables.push(currentTable);
        } else {
            modules.forEach(m => {
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
