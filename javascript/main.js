/*jslint indent:8, devel:true, browser:true, vars:true*/
/*global require*/

require.config({
        baseUrl: "javascript",
        scriptType: "text/javascript;version=1.8"
});

require(['clientApp'], function (Application) {
        "use strict";

        Application.App.init();
});
