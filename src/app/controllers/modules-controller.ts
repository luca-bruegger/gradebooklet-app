import {Module} from "../models/module";
import {GradesystemType} from "../models/gradesystem";
import {Color} from "../models/color";
import {Storage} from "@ionic/storage";
import {SwissGradesystem} from "../gradesystems/swiss-gradesystem";
import {SwissAdvancedGradesystem} from "../gradesystems/swiss-advanced-gradesystem";

export class ModulesController {
    colorController: Color = new Color;
    modules: Module[] = [];

    constructor(private storage: Storage) {}

    migrateModules() {
        this.modules.forEach(m => {
            const notMigratedModule = Object.assign(new Module(), m)
            if (notMigratedModule.gradesystemType == undefined) {
                m.gradesystemType = GradesystemType.SwissGradesystem;
                const mGradesystem = this.getGradesystemObject(m);
                mGradesystem.calculateAverageGrade();
            }
        })
    }

    getGradesystemObject(m: Module) {
        switch (m.gradesystemType) {
            case GradesystemType.SwissAdvancedGradesystem: {
                return new SwissAdvancedGradesystem(m)
            }
            case GradesystemType.SwissGradesystem:{
                return new SwissGradesystem(m)
            }
        }
    }

    private async loadModules() {
        await this.storage.get('modules').then(data => {
            if (!!data) {
                this.modules = JSON.parse(data);
                this.migrateModules()
            }
        });
    }

    async loadModulesFromDatabase() {
        await this.loadModules()
        return this.modules;
    }
}

