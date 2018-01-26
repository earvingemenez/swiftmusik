import { MainFooterComponent } from 'app/components/includes/main-footer/main-footer.component';
import { MainHeaderComponent } from 'app/components/includes/main-header/main-header.component';


export function createViewsWithCommonIncludes(
  content,
  header = MainHeaderComponent,
  footer = MainFooterComponent
  ) {
  return {
    'header': header,
    'content': content,
    'footer': footer,
  }
}
