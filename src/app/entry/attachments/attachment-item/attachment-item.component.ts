import { Router, ActivatedRoute, Params  } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Attachment } from '../attachment.model';

@Component({
  selector: 'app-attachment-item',
  templateUrl: './attachment-item.component.html',
  styleUrls: ['./attachment-item.component.scss']
})
export class AttachmentItemComponent implements OnInit {

  pia_id: number;
  @Input() attachment: any;
  @Output() delete: EventEmitter<number> = new EventEmitter<number>();

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.pia_id = params['id'];
    });
  }

  /**
   * Deletes an attachment which was added to a PIA.
   * @param {number} id the unique id of the attachment.
   * @param {Event} event any kind of event.
   */
  deleteAttachment(id: number, event: Event) {
    // TODO Change to use MODAL
    console.log(id);
    console.log(event);
    if (confirm('Merci de confirmer la suppression de cette pièce jointe')) {
      const attachment = new Attachment();
      this.delete.emit(id);
      attachment.delete(id);
    }
  }

  /**
   * Allows an user to download a specific attachment.
   * @param {number} id the unique id of the attachment.
   */
  downloadAttachment(id: number) {
    const attachment = new Attachment();
    attachment.find(id).then((entry: any) => {
      const url = entry.file.replace('data:', 'data:' + entry.type);
      fetch(url).then(res => res.blob()).then(blob => {
          const url = window.URL.createObjectURL(blob);
          window.open(url);
        }
      );
    });
  }

}
