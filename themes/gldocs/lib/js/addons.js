$(function(){

	// community/collection list browser
	elements = $("#aspect_artifactbrowser_CommunityBrowser_div_comunity-browser .artifact-title")
		.filter(function(){ return $(this).parent().siblings('ul').length })
		.prepend('<span class="open">[+]</span>');
	$("#aspect_artifactbrowser_CommunityBrowser_div_comunity-browser li ul").hide();
	$("#aspect_artifactbrowser_CommunityBrowser_div_comunity-browser span.open").click(function() {
		$(this).toggleClass('close');
		$(this).parent().parent().siblings('ul').slideToggle();
	});
	
	// caputre ctrl + d (bookmark)
	$.ctrl('D', function(s) {
		$('a.bookmark').click();
	});
	
	$("a.bookmark").attr('title', $('h1.title').text());
	
	$("a.bookmark").click(function() {
		//e.preventDefault();
		var bookmarkUrl = this.href;
		var bookmarkTitle = this.title;
		if ($.browser.mozilla) { // For Mozilla Firefox Bookmark
			window.sidebar.addPanel(bookmarkTitle, bookmarkUrl,"");
		} else if ($.browser.msie || $.browser.webkit) { // For IE Favorite
			window.external.AddFavorite(bookmarkUrl, bookmarkTitle);
		} else if ($.browser.opera ) { // For Opera Browsers
			$(this).attr("href",bookmarkUrl);
			$(this).attr("title",bookmarkTitle);
			$(this).attr("rel","sidebar");
			$(this).click();
		} else { // for other browsers which does not support
			alert('Please hold CTRL+D and click the link to bookmark it in your browser.');
		}
		return false;
	});
	
});

$.ctrl = function(key, callback, args) {
    $(document).keydown(function(e) {
        if(!args) args=[]; // IE barks when args is null
        if(e.keyCode == key.charCodeAt(0) && e.ctrlKey) {
            callback.apply(this, args);
            return false;
        }
    });
};

function popUp(URL) {
        var page;
        page = window.open(URL, 'controlledvocabulary', 'toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=1,width=650,height=450');
}

var citation_info = "Bitte geben Sie die bibliographische Zitation in folgender Form ein:";
var citation_hint = "Zur Dateneingabe benutzen Sie bitte die Eingabeschablone, die die Daten automatisch formatiert!";


function renderAnthology() {

var anth_help = ' Philipp, S., Leiss, B, Vollbrecht, A., Tanner, D.; Gudmundsson, A. (eds.): 11. Symposium "Tektonik, Struktur- und Kristallingeologie"; 2006, Universitätsverlag Göttingen, p. 125 - 127'; 

        $('#aspect_submission_StepTransformer_field_dc_identifier_citation').siblings('.field-help').html(citation_info + '<br /><b>' + anth_help + '</b><br /><br />');
        $('#aspect_submission_StepTransformer_field_dc_identifier_citation').val(citation_hint);

        $('#aspect_submission_StepTransformer_field_dc_identifier_citation').parents('div').siblings('label').append('<a  class="subform" href="javascript:void(null)" onclick=\'javascript:popUp("/ant-form.html")\'><span  class="controlledVocabularyLink"> Eingabeschablone</span></a>');
        if ($('#aspect_submission_StepTransformer_field_dc_identifier_citation').val() == "") {
                $('#aspect_submission_StepTransformer_field_dc_identifier_citation').val(citation_hint);
        }

}


function renderArticle() {
var article_format = "Zeitschriftenname; Vol. NN.Year, No. NN, p. NN-NN"; 

                $('#aspect_submission_StepTransformer_field_dc_identifier_citation').siblings('.field-help').html(citation_info + '<br /><b>' + article_format + '</b><br /><br />');

        $('#aspect_submission_StepTransformer_field_dc_identifier_citation').parents('div').siblings('label').append('<a  class="subform" href="javascript:void(null)" onclick=\'javascript:popUp("/article-form.html")\'><span  class="controlledVocabularyLink"> Eingabeschablone</span></a>');
        if ($('#aspect_submission_StepTransformer_field_dc_identifier_citation').val() == "") {        
                $('#aspect_submission_StepTransformer_field_dc_identifier_citation').val(citation_hint);
        }
}
        


function renderMonograph() {
var mon_help = "Debrenne, Francoise; Reitner, Joachim : The ecology of the Cambrian radiation; 2001, New York Columbia University Press, New York / Kap. 3,4";

//replace citation hint
        $('#aspect_submission_StepTransformer_field_dc_identifier_citation').siblings('.field-help').html(citation_info + '<br /><b>' + mon_help + '</b><br /><br />');

        $('#aspect_submission_StepTransformer_field_dc_identifier_citation').parents('div').siblings('label').append('<a  class="subform" href="javascript:void(null)" onclick=\'javascript:popUp("/book-form.html")\'><span  class="controlledVocabularyLink"> Eingabeschablone</span></a>');
        if ($('#aspect_submission_StepTransformer_field_dc_identifier_citation').val() == "") {
                $('#aspect_submission_StepTransformer_field_dc_identifier_citation').val(citation_hint);
        }
}

function renderReport() {
var report_help = "IFM-GEOMAR Report; 10 oder Scientific Technical Report / Geoforschungszentrum Potsdam; 2001, 07";

//replace citation hint
        $('#aspect_submission_StepTransformer_field_dc_identifier_citation').siblings('.field-help').html(citation_info + '<br /><b>' + report_help + '</b><br /><br />' + citation_hint);
/*
$('#aspect_submission_StepTransformer_field_dc_identifier_citation').parents('div').siblings('label').append('<a  class="subform" href="javascript:void(null)" onclick=\'javascript:po
pUp("/gldocs/report-form.html")\'><span  class="controlledVocabularyLink> Eingabeschablone</span></a>');
*/

}

//replace citation hint
        $('#aspect_submission_StepTransformer_field_dc_identifier_citation').siblings('.field-help').html(citation_info + '<br /><b>' + report_help + '</b><br /><br />' + citation_hint);
nt);
/*
$('#aspect_submission_StepTransformer_field_dc_identifier_citation').parents('div').siblings('label').append('<a  class="subform" href="javascript:void(null)" onclick=\'javascript:po
pUp("/gldocs/report-form.html")\'><span  class="controlledVocabularyLink> Eingabeschablone</span></a>');
*/

}


function renderTypes() {
        clearSubform();

        if ($('#aspect_submission_StepTransformer_field_dc_type option:selected').text() == 'Zeitschriftenartikel') {
                renderArticle();
                }       

        if ($('#aspect_submission_StepTransformer_field_dc_type option:selected').text() == 'Sammelbandbeitrag') {
                renderAnthology();
                }

        if ($('#aspect_submission_StepTransformer_field_dc_type option:selected').text() == 'Buchkapitel') {
                renderMonograph();
                }       
        if ($('#aspect_submission_StepTransformer_field_dc_type option:selected').text() == 'Forschungsbericht') {
                renderReport();
                }

}

function addClassTree() {
                        if ($('a.temp').length > 0){
                        $('a.temp').remove();
                }
                if ($('#aspect_submission_StepTransformer_field_dc_subject_qualifier').val() == "ddc") {
                        $('#aspect_submission_StepTransformer_field_dc_subject_qualifier').parents('div.ds-form-content').append('<a class="temp" href="javascript:void(null)" onclick=\'javascript:popUp("/jspui/controlledvocabulary/controlledvocabulary.jsp?ID=dc_subject_value&amp;vocabulary=ddc")\'><span class="controlledVocabularyLink">DDC-Baum</span></a>'
		);

                }
                else if ($('#aspect_submission_StepTransformer_field_dc_subject_qualifier').val() == "bk") {
                        $('#aspect_submission_StepTransformer_field_dc_subject_qualifier').parents('div.ds-form-content').append('<a  class="temp" href="javascript:void(null)" onclick=\'javascript:popUp("/jspui/controlledvocabulary/controlledvocabulary.jsp?ID=dc_subject_value&amp;vocabulary=bk")\'><span class="controlledVocabularyLink">BK-Baum</span></a>');
			
			}		
		}

$(document).ready(function(){

        if (($('#aspect_submission_StepTransformer_field_dc_subject_qualifier option:selected').val() == "ddc") || ($j('#aspect_submission_StepTransformer_field_dc_subject_qualifier option:selected').val() == "bk")) {
        addClassTree();
  }
        
        $('#aspect_submission_StepTransformer_field_dc_subject_qualifier').change(function(e) {
                addClassTree();
        });

        renderTypes();
        $('#aspect_submission_StepTransformer_field_dc_type').change(function(e){
                renderTypes();
        });



})



