import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modal: HTMLIonModalElement = null;

  constructor() { }

  isActive() {
    return !! this.modal;
  }

  setActive(modal: HTMLIonModalElement) {
    this.modal = modal;
  }

  deactivate(){
    this.modal = null;
  }

  getModal() {
    return this.modal;
  }

  hideModal() {
    console.log(this.modal)
    if(this.isActive()) {
      // this.modal.
    }
  }

  showModal() {
    if(this.isActive()) {
      this.modal.present
    }
  }
}
