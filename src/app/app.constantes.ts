/* App info */

export const VERSION = '0.0.1';

/* Path constant */

export const PATH_HOME = '';
export const PATH_RACKET = 'racket';
export const PATH_SETUP = 'setup';

/* Address constant */

export const API_ADDRESS = 'http://localhost:';
export const API_PORT = 5000;
export const API_SOCKET_PORT = 42666;

/* Catalogue request constant */

export const REQUEST_CATALOGUE = '/catalog';
export const REQUEST_CATALOGUE_OBJECTS_TYPES = '/objects/types';
export const REQUEST_CATALOGUE_CONSTELATIONS = '/constelations';

/* Command request constant */

export const REQUEST_COMMAND = '/command';
export const REQUEST_COMMAND_DIRECTION = '/move';
export const REQUEST_COMMAND_TRACK = '/track';
export const REQUEST_COMMAND_STOP = '/stop';

/* Setup request constant */

export const REQUEST_SETUP = '/setup';
export const REQUEST_SETUP_INIT = '/init';
export const REQUEST_SETUP_POINT = '/point';
export const REQUEST_SETUP_RESET = '/reset';
export const REQUEST_SETUP_VALIDATE = '/validate';

/* Other request constant */

export const REQUEST_CONNECTION = '/connection';
export const REQUEST_POSITION = '/position';
export const REQUEST_INFOS = '/informations'

/* Table names */

export const TABLE_DEEPSKY_OBJECTS = 'objects';
export const TABLE_DEEPSKY_STARS = 'stars';
export const TABLE_DEEPSKY_EXOPLANET = 'exoplanets';