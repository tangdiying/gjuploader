import { Directive, ElementRef, ViewContainerRef, OnInit, Input, TemplateRef } from '@angular/core';
import { Overlay, OverlayRef, OverlayConfig } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

@Directive({
  selector: '[appGruop]'
})
export class GruopDirective implements OnInit{
  @Input() templateContent:TemplateRef<any>
  ngOnInit(): void {
    this.overlayRef = this.overlay.create({
      positionStrategy:this.overlay.position().flexibleConnectedTo(this.element).withPositions([
        {
          originX:'center',
          originY:'center',
          overlayX:'center',
          overlayY:'center'
        }
      ]),
      hasBackdrop:false
    })
    this.overlayRef.attach(new TemplatePortal(this.templateContent,this.viewContainerRef))
  }
  overlayRef:OverlayRef
  protal:TemplatePortal
  constructor(
    private element:ElementRef,
    private overlay:Overlay,
    private viewContainerRef:ViewContainerRef,
  ) { }

}
