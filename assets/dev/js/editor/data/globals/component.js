import ComponentBase from 'elementor-api/modules/component-base';
import DocumentCache from 'elementor-editor/data/globals/helpers/document-cache';

import * as commandsData from './commands/';
import * as hooks from './hooks/';

export default class Component extends ComponentBase {
	__construct( args = {} ) {
		super.__construct( args );

		// TODO: Remove - Create testing compatibility.
		if ( elementorCommonConfig.isTesting ) {
			return;
		}

		elementor.on( 'document:loaded', this.onDocumentLoaded.bind( this ) );
		elementorCommon.elements.$window.on( 'elementor:loaded', this.onElementorLoaded.bind( this ) );
	}

	getNamespace() {
		return 'globals';
	}

	defaultData() {
		return this.importCommands( commandsData );
	}

	defaultHooks() {
		return this.importHooks( hooks );
	}

	onDocumentLoaded( document ) {
		DocumentCache.updateFromConfig( document );
	}

	onElementorLoaded() {
		// Add global cache before render.
		$e.data.get( 'globals/index', {}, { cache: true } );
	}
}
