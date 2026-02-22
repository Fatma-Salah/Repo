
import {
  Directive,
  Input,
  ViewContainerRef,
  ComponentRef, 
  OnDestroy, 
} from '@angular/core';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
 
@Directive({
  selector: '[appShowLoaderUntilPageLoaded]',
  standalone: true
})
export class ShowLoaderUntilPageLoadedDirective  implements  OnDestroy {
  @Input() set isReady(value: boolean) {
    this.createLoader(value)
  }

  private loaderRef: ComponentRef<LoaderComponent> | null = null;

  constructor(private vcr: ViewContainerRef) {}
  private createLoader(allComponentLoaded: boolean) {
    // get parent element
    const parentElement=this.vcr.element.nativeElement
    if(allComponentLoaded){
      //appear parent element
       parentElement.style.display = ''
       parentElement.classList.remove('d-none')
    this.removeLoader(allComponentLoaded);
    }else{
      // remove parent
       parentElement.classList.add('d-none')
       // Dynamically create the loader component
       this.loaderRef = this.vcr.createComponent(LoaderComponent);
    }
  }

  private removeLoader(allComponentLoaded: boolean) {
    if (this.loaderRef && allComponentLoaded) {
      this.loaderRef.destroy();
    }
  }

  ngOnDestroy() {
    if (this.loaderRef) {
      this.loaderRef.destroy();
    }
  }
}
