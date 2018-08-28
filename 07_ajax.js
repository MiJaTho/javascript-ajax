(function (window, document, $) {
    "use strict";
    $(function () {
        var $a = $("#liste").find("a");
        var $out = $("#ausgabe");

        /* ################################################################
         Anfrage - load - fragment.html 
         ################################################################ */

        // $a.eq(0).on("click",function(e){
        //     e.preventDefault();
        //     $out.load("../../_lib/data/fragment.html");
        // });

        /* ################################################################
        Defereds/Promise 
         ################################################################  */
        /* The jqXHR.success(), jqXHR.error(), and jqXHR.complete() callback methods are removed as of jQuery 3.0. You can use jqXHR.done(), jqXHR.fail(), and jqXHR.always() instead. */

        // $a.eq(0).on("click",function(e){
        //     e.preventDefault();  
        //     $.ajax("../../_lib/data/fragment.html")//Asychronen HTTP-Request erzeugen
        //     .done(function(data){ //wenn erfolgreich
        //         $out.empty().append(data);
        //     }).fail(function(a,b,c){ //wenn Fehler
        //         console.log(a,b,c);
        //     }).always(function(){ // Immer

        //     });
        // });


        /* 
        //GET vs POST
        https://www.w3schools.com/tags/ref_httpmethods.asp

        //Werden die Daten die gesendet werden verändert?
            // JA -> POST
            // NEIN -> GET

        //Werden die Daten nur angefordert?
            // JA -> GET
            // NEIN -> POST

        //POST wird genutzt um Daten auf dem Server zu erzeugen oder zu updaten
        
        */


        /* Ausführliche mit Erklärung */
        // $a.eq(0).on("click", function (e) {
        //     e.preventDefault();
        //     $.ajax({
        //         url: "../../_lib/data/fragment.html",
        //         type: "POST", // GET | POST (GET ist Standard)
        //         contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        //         context: document.getElementById("ausgabe"),
        //         dataType: "html", // xml | json | jsonp | script | html | text
        //         data: {
        //             key: "value",
        //             key2: "value2"
        //         },
        //         success: function (data) { //Bei Erfolg
        //             //this ist hier der DOM-Knoten aus context (document.getElementById("ausgabe"))
        //             $(this).empty().append(data);
        //             /* Alternativ mit Variable out oder direkt $("#ausgabe"):
        //             context macht relativ wenig Sinn */
        //             // $out.empty().append(data); 
        //             // $("#ausgabe").empty().append(data);
        //         },
        //         error: function (xhr, status, error) { //Bei Fehlern
        //             console.log(xhr, status, error);
        //             console.log(xhr.status);
        //         },
        //         beforeSend: function (xhr, settings) { // Immer vor abschicken des Requests
        //             console.log(xhr, "\n\n\n", settings);
        //         }, 
        //         complete : function() { // Alles nach success bzw. error

        //         }
        //     });
        // });

        /* Nur die nötigen Angaben */
        $a.eq(0).on("click", function (e) {
            e.preventDefault();
            $.ajax({
                url: "../../_lib/data/fragment.html",
                success: function (data) {
                    $out.empty().append(data);
                }
            });
        });


        /* ################################################################
        Anfrage - load - pathfinder.html
        Funktioniert bei html, php und txt Dateien aber nicht bei
        json und xml. Der String der angefordert wird, landet direkt
        im Ausgabecontainer.
        ################################################################ */
        $a.eq(1).on("click", function (e) {
            e.preventDefault();
            $out.load("../../_lib/data/pathfinder.html #main");
        });

        $a.eq(2).on("click", function (e) {
            e.preventDefault();
            $.get("../../_lib/data/pathfinder.html", function (data) {
                ///////////////////////////////////////////////////////////////////////
                /* https://developer.mozilla.org/de/docs/Web/API/DOMParser */
                // var parser = new DOMParser();
                // var htmlDoc = parser.parseFromString(data, "text/html");
                // console.log(htmlDoc);
                // console.log($(htmlDoc).find("#main"));
                // $out.empty().append($(htmlDoc).find("#main"));
                ///////////////////////////////////////////////////////////////////////

                // console.log($(data).eq(5));
                // console.log($(data));
                $out.empty().append($(data).eq(5));
            }, "html");
        });

        /* ################################################################
         Anfrage - getJSON - person.json
         ################################################################ */
        $a.eq(3).on("click", function (e) {
            e.preventDefault();
            $.getJSON("../../_lib/data/person.json", function(data){
                var html = "<ul>";
                for(var key in data) {
                    html += "<li>" + capitalize(key) + " : " + data[key] + "</li>";
                }
                html += "</ul>";
                $out.empty().append(html);
            });
        });


        /* ################################################################
         Anfrage - get - kontakt.xml
         ################################################################ */
        // $a.eq(4).on("click", function (e) {
        //     e.preventDefault();
        //     $.get("../../_lib/data/kontakt.xml", function(data){
        //         var $xml = $(data);
        //         console.log($xml.find("kontakt").children());
        //         var html = "<ul>";
        //         // Langform zum besseren Verständnis
        //         // Kurzform für diese Ausgabe: $xml.find("name").text() 
        //         html += "<li>Name: " + $xml.find("kontakt").eq(0).find("name").eq(0).text() + "</li>";
        //         html += "<li>Ort: " + $xml.find("kontakt").eq(0).find("ort").eq(0).text() + "</li>";
        //         html += "<li>Straße: " + $xml.find("kontakt").eq(0).find("strasse").eq(0).text() + "</li>";
        //         html += "<li>Postleitzahl: " + $xml.find("kontakt").eq(0).find("postleitzahl").eq(0).text() + "</li>";
        //         html += "<li>Geschlecht: " + $xml.find("kontakt").eq(0).attr("geschlecht") + "</li>";
        //         html += "</ul>";
        //         $out.empty().append(html);
        //     },"xml");
        // });


        // $a.eq(4).on("click", function (e) {
        //     e.preventDefault();
        //     $.ajax({
        //         url : "../../_lib/data/kontakt.xml",
        //         dataType : "xml",
        //         success : function(data){
        //             var $xml = $(data);
        //             var $content = $xml.find("kontakt").children();
        //             var html = "<ul>";
        //             for (var i = 0; i < $content.length; i++) {
        //                 html += "<li>" + capitalize($content.eq(i).prop("tagName")) + ": " + $content.eq(i).text() + "</li>";                    
        //             }
        //             html += "<li>Geschlecht: " + $xml.find("kontakt").eq(0).attr("geschlecht") + "</li>";
        //             html += "</ul>";
        //             $out.empty().append(html);
        //         }
        //     })
        // });  

        $a.eq(4).on("click", function (e) {
            e.preventDefault();
            $.get("../../_lib/data/kontakt.xml", function (data) {
                var $xml = $(data);
                var $content = $xml.find("kontakt").children();
                var html = "<ul>";
                for (var i = 0; i < $content.length; i++) {
                    html += "<li>" + capitalize($content.eq(i).prop("tagName")) + ": " + $content.eq(i).text() + "</li>";
                }
                html += "<li>Geschlecht: " + $xml.find("kontakt").eq(0).attr("geschlecht") + "</li>";
                html += "</ul>";
                $out.empty().append(html);
            }, "xml");
        });

        /* 
        load benutzt man nur wenn die Daten die vom Server geliefert werden direkt ohne weitere Verarbeitung
        ausgegeben werden können. PHP-Datei oder HTML-Datei die einen String mit Zeichen und ggf. HTML-Tags liefern.

        XML, JSON, JSONP Datein müssen immer noch einmal in JS verarbeitet werden, können also nicht mit load angefordert werden.
        */

       $a.eq(5).on("click", function (e) {
        e.preventDefault();
        /* 2 Parameter Objekt: Schlüssel-Wert-Paare */
        $.get("../../_lib/php/get_post.php", {foo : "bar", bar : "foo"} ,function (res) {
            $out.empty().append(res);
        }, "html");

        /* 2 Parameter String */
        // $.get("../../_lib/php/get_post.php", "foo=bar&bar=foo", function (res) {
        //     $out.empty().append(res);
        // }, "html");
    });


    $("form")
    .on("submit", function(e){
        e.preventDefault();        
        // $.post("../../_lib/php/get_post.php", { eingabe : $("#eingabe").val().trim() }, function(res){
        //     $out.empty().append(res);
        // });

        /* https://api.jquery.com/serialize/ 
        serialize erzeugt aus allen Name-Value Paaren des Formulars einen Query-String */
        console.log($(this).serialize());

        $.post("../../_lib/php/get_post.php", $(this).serialize(), function(res){
            $out.empty().append(res);
        }/* , "html" */);

    
    });


    }) // $(function{}) //=> $(document)
    .ajaxError(function (event, xhr, settings, error) {
        console.log(error);
    })
    .ajaxSend(function(event,xhr,settings){})
    .ajaxStart(function(event){
        console.log(event);
    })
    .ajaxStop(function(event){
        console.log(event);
    })
    .ajaxSuccess(function(event,xhr, settings, data){

    })
    .ajaxComplete(function(event, xhr, data){

    });
}(window, document, jQuery));


/* Mehrere Anfragen innerhalb einer Seite */
// $(function(){
//     //DOM-Ready
// })
// .ajaxError(function(){})
// .ajaxSend(function(){})
// .ajaxStart(function(){})
// .ajaxStop(function(){})
// .ajaxSuccess(function(){})
// .ajaxComplete(function(){})


/* Eine Anfragen mit ausführlichen Einstellungen */
// $.ajax({
//     url: "../../_lib/data/fragment.html",
//     type: "POST", // GET | POST (GET ist Standard)
//     contentType: "application/x-www-form-urlencoded;charset=UTF-8",
//     context: document.getElementById("ausgabe"),
//     dataType: "html", // xml | json | jsonp | script | html | text
//     data: {
//         key: "value",
//         key2: "value2"
//     },
//     success: function (data) { //Bei Erfolg
//         //this ist hier der DOM-Knoten aus context (document.getElementById("ausgabe"))
//         $(this).empty().append(data);
//         /* Alternativ mit Variable out oder direkt $("#ausgabe"):
//         context macht relativ wenig Sinn */
//         // $out.empty().append(data); 
//         // $("#ausgabe").empty().append(data);
//     },
//     error: function (xhr, status, error) { //Bei Fehlern
//         console.log(xhr, status, error);
//         console.log(xhr.status);
//     },
//     beforeSend: function (xhr, settings) { // Immer vor abschicken des Requests
//         console.log(xhr, "\n\n\n", settings);
//     }, 
//     complete : function() { // Alles nach success bzw. error

//     }
// });

/* Einfache Anfrage mit Deffered */
// $.getJSON("xxx")
// .done(function(data){ 

// }).fail(function(a,b,c){ 
//     console.log(a,b,c);
// }).always(function(a,b,c){ 

// });