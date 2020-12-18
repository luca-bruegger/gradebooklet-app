import {Component} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {ModulesController} from '../../../controllers/modules-controller';
import {AESEncryptDecryptService} from './aesencrypt-decrypt-service.service';

@Component({
  selector: 'app-backup-popover',
  templateUrl: './backup-popover.component.html',
  styleUrls: ['./backup-popover.component.scss'],
})
export class BackupPopoverComponent {
  password: FormControl = new FormControl('', [Validators.minLength(8), Validators.required]);

  constructor(private modulesController: ModulesController,
              private aesService: AESEncryptDecryptService) { }


  async copyAndEncryptData() {
    const modules = await this.modulesController.loadModulesFromDatabase();
    console.log(modules.toString())

    const encrypted = this.aesService.encrypt(modules.toString(), 'Secret Passphrase');
    console.log(encrypted)
    const decrypted = this.aesService.decrypt(encrypted, 'Secret Passphrase');
    console.log(decrypted)
  }
}
