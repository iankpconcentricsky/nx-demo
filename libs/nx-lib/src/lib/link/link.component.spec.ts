import { createHostFactory } from '@ngneat/spectator/jest';
import { axe } from 'jest-axe';

import { JestSpectatorHost } from '../jest-spectator-host';

import { LinkComponent } from './link.component';

describe('LinkComponent', () => {
  const createHost = createHostFactory(LinkComponent);
  const host = new JestSpectatorHost<LinkComponent>();

  it('should create base component', () => {
    host.setupTestHost(createHost(`<a gp-link>click here</a>`));
    expect(host.component).toBeTruthy();
  });

  it('should have appropriate default values for base component with no inputs set', () => {
    host.setupTestHost(createHost(`<a gp-link>click here</a>`));
    expect(host.component?.size).toBe('default');
    expect(host.component?.iconVariations).not.toBeDefined();
    expect(host.component?.iconId).toBe('gp-icon-edit');
  });

  it('should properly set component props from tag inputs set by host', () => {
    host.setupTestHost(createHost(`<a gp-link [size]="size" [iconVariations]="iconVariations" [iconId]="iconId">click here</a>`, {
      hostProps: {
        size: 'small',
        iconVariations: 'iconleft',
        iconId: 'gp-icon-language'
      }
    }));
    expect(host.component?.size).toBe('small');
    expect(host.component?.iconVariations).toBe('iconleft');
    expect(host.component?.iconId).toBe('gp-icon-language');
  });

  it('should use @hostbinding to set class of anchor tag', () => {
    host.setupTestHost(createHost(`<a gp-link [iconVariations]="iconVariations"></a>`, {
      hostProps: {
        iconVariations: 'iconright'
      }
    }));
    expect(host.spectator?.element.tagName).toBe('A');
    ['gp-link', 'gp-link-default', 'gp-link-iconright'].forEach(cls => {
      expect(host.component?.classSetter).toContain(cls);
      expect(host.spectator?.element.className.split(' ')).toContain(cls);
    });
  });

  it("should be accessible", async () => {
    host.setupTestHost(createHost(`<a gp-link>click here</a>`));
    const results = await axe(host.spectator!.fixture.nativeElement);
    expect(results).toHaveNoViolations();
  });
});
