/**
 * This is a workaround for the fact that p5.play requires the planck-js library to be loaded into the global namespace.
 */

import Planck from "./planck-loader";

// Need to use Planck otherwise it won't be imported
Planck;

// Disable google tag manager
window['_p5play_gtagged'] = false;

/** Import the p5.play library */
import "p5play";
