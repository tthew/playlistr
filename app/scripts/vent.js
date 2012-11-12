/**
 * Playlistr 
 *
 * A Soundcloud playlisting application
 *
 * @package Playlistr
 * @author Matt Richards
 * @copyright Copyright (c) 2012, Matt Richards
 * @licence http://opensource.org/licenses/MIT
 * @link http://lucidmoon.co.uk
 */
define([
    'marionette'
],
/**
 * Application Event Aggregator
 * @name    Vent
 * @class   Vent
 * @constructor
 * @return {Marionette.EventAggregator} Marionette.EventAggregator
 */
function(marionette){
    "use strict";
    return new marionette.EventAggregator();
});
