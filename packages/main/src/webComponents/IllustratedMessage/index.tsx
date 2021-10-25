import { IllustrationMessageType } from '@ui5/webcomponents-react/dist/IllustrationMessageType';
import { withWebComponent } from '@ui5/webcomponents-react/dist/withWebComponent';
import { CommonProps } from '@ui5/webcomponents-react/interfaces/CommonProps';
import { ReactNode } from 'react';

import '@ui5/webcomponents-fiori/dist/IllustratedMessage.js';

export interface IllustratedMessagePropTypes extends CommonProps {
  /**
   * Defines the illustration name that will be displayed in the component.
   *
   * Available illustrations are:
   *
   * *   `BeforeSearch`
   * *   `NoActivities`
   * *   `NoData`
   * *   `NoEntries`
   * *   `NoMail`
   * *   `NoNotifications`
   * *   `NoSavedItems`
   * *   `NoSearchResults`
   * *   `NoTasks`
   * *   `UnableToLoad`
   * *   `UnableToUpload`
   * *   `TntCompany`
   * *   `TntExternalLink`
   * *   `TntFaceID`
   * *   `TntFingerprint`
   * *   `TntLock`
   * *   `TntMission`
   * *   `TntNoApplications`
   * *   `TntNoFlows`
   * *   `TntNoUsers`
   * *   `TntRadar`
   * *   `TntServices`
   * *   `TntSessionExpired`
   * *   `TntSessionExpiring`
   * *   `TntSuccess`
   * *   `TntSuccessfulAuth`
   * *   `TntUnlock`
   * *   `TntUnsuccessfulAuth`
   *
   *
   *
   * **Note:** By default the `BeforeSearch` illustration is loaded.
   * When using an illustration type, other than the default, it should be loaded in addition:
   * `import "@ui5/webcomponents-fiori/dist/illustrations/NoData.js";`
   *
   * **Note:** TNT illustrations cointain `Tnt` prefix in their name. You can import them removing the `Tnt` prefix like this:
   * `import "@ui5/webcomponents-fiori/dist/illustrations/tnt/SessionExpired.js";`
   */
  name?: IllustrationMessageType | keyof typeof IllustrationMessageType;
  /**
   * Defines the subtitle of the component.
   *
   * **Note:** Using this property, the default subtitle text of illustration will be overwritten.
   *
   * **Note:** Using `subtitle` slot, the default of this property will be overwritten.
   */
  subtitleText?: string;
  /**
   * Defines the title of the component.
   *
   * **Note:** Using this property, the default title text of illustration will be overwritten.
   */
  titleText?: string;
  /**
   * Defines the component actions.
   */
  children?: ReactNode | ReactNode[];
  /**
   * Defines the subtitle of the component.
   *
   * **Note:** Using this slot, the default subtitle text of illustration and the value of `subtitleText` property will be overwritten.
   *
   * __Note:__ When passing a custom React component to this prop, you have to make sure your component reads the `slot` prop and appends it to the most outer element of your component.
   * Learn more about it [here](https://sap.github.io/ui5-webcomponents-react/?path=/docs/knowledge-base--page#adding-custom-components-to-slots).
   */
  subtitle?: ReactNode;
}

/**
 * An IllustratedMessage is a recommended combination of a solution-oriented message, an engaging illustration, and conversational tone to better communicate an empty or a success state than just show a message alone. Each illustration has default internationalised title and subtitle texts. Also they can be managed with `titleText` and `subtitleText` properties. To display the desired illustration, use the `name` property, where you can find the list of all available illustrations.
 *
 * **Note:** By default the “BeforeSearch” illustration is loaded. To use other illustrations, make sure you import them in addition, for example:
 * `import "@ui5/webcomponents-fiori/dist/illustrations/NoData.js"`
 *
 * <ui5-link href="https://sap.github.io/ui5-webcomponents/playground/components/IllustratedMessage" target="_blank">UI5 Web Components Playground</ui5-link>
 */
const IllustratedMessage = withWebComponent<IllustratedMessagePropTypes>(
  'ui5-illustrated-message',
  ['name', 'subtitleText', 'titleText'],
  [],
  ['subtitle'],
  []
);

IllustratedMessage.displayName = 'IllustratedMessage';

IllustratedMessage.defaultProps = {
  name: IllustrationMessageType.BeforeSearch
};

export { IllustratedMessage };