(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,35305,(a,e,i)=>{"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},37975,(a,e,i)=>{"use strict";var t=a.r(35305);function n(){}function o(){}o.resetWarningCache=n,e.exports=function(){function a(a,e,i,n,o,p){if(p!==t){var r=Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw r.name="Invariant Violation",r}}function e(){return a}a.isRequired=a;var i={array:a,bigint:a,bool:a,func:a,number:a,object:a,string:a,symbol:a,any:a,arrayOf:e,element:a,elementType:a,instanceOf:e,node:a,objectOf:e,oneOf:e,oneOfType:e,shape:e,exact:e,checkPropTypes:o,resetWarningCache:n};return i.PropTypes=i,i}},4153,(a,e,i)=>{e.exports=a.r(37975)()},75592,(a,e,i)=>{"use strict";i.__esModule=!0,i.default=function(a,e){if(a&&e){var i=Array.isArray(e)?e:e.split(",");if(0===i.length)return!0;var t=a.name||"",n=(a.type||"").toLowerCase(),o=n.replace(/\/.*$/,"");return i.some(function(a){var e=a.trim().toLowerCase();return"."===e.charAt(0)?t.toLowerCase().endsWith(e):e.endsWith("/*")?o===e.replace(/\/.*$/,""):n===e})}return!0}},31713,a=>{"use strict";var e=a.i(76350),i=a.i(12612),t=a.i(73576),n=a.i(4153);function o(a,e,i,t){return new(i||(i=Promise))(function(n,o){function p(a){try{l(t.next(a))}catch(a){o(a)}}function r(a){try{l(t.throw(a))}catch(a){o(a)}}function l(a){var e;a.done?n(a.value):((e=a.value)instanceof i?e:new i(function(a){a(e)})).then(p,r)}l((t=t.apply(a,e||[])).next())})}"function"==typeof SuppressedError&&SuppressedError;let p=new Map([["1km","application/vnd.1000minds.decision-model+xml"],["3dml","text/vnd.in3d.3dml"],["3ds","image/x-3ds"],["3g2","video/3gpp2"],["3gp","video/3gp"],["3gpp","video/3gpp"],["3mf","model/3mf"],["7z","application/x-7z-compressed"],["7zip","application/x-7z-compressed"],["123","application/vnd.lotus-1-2-3"],["aab","application/x-authorware-bin"],["aac","audio/x-acc"],["aam","application/x-authorware-map"],["aas","application/x-authorware-seg"],["abw","application/x-abiword"],["ac","application/vnd.nokia.n-gage.ac+xml"],["ac3","audio/ac3"],["acc","application/vnd.americandynamics.acc"],["ace","application/x-ace-compressed"],["acu","application/vnd.acucobol"],["acutc","application/vnd.acucorp"],["adp","audio/adpcm"],["aep","application/vnd.audiograph"],["afm","application/x-font-type1"],["afp","application/vnd.ibm.modcap"],["ahead","application/vnd.ahead.space"],["ai","application/pdf"],["aif","audio/x-aiff"],["aifc","audio/x-aiff"],["aiff","audio/x-aiff"],["air","application/vnd.adobe.air-application-installer-package+zip"],["ait","application/vnd.dvb.ait"],["ami","application/vnd.amiga.ami"],["amr","audio/amr"],["apk","application/vnd.android.package-archive"],["apng","image/apng"],["appcache","text/cache-manifest"],["application","application/x-ms-application"],["apr","application/vnd.lotus-approach"],["arc","application/x-freearc"],["arj","application/x-arj"],["asc","application/pgp-signature"],["asf","video/x-ms-asf"],["asm","text/x-asm"],["aso","application/vnd.accpac.simply.aso"],["asx","video/x-ms-asf"],["atc","application/vnd.acucorp"],["atom","application/atom+xml"],["atomcat","application/atomcat+xml"],["atomdeleted","application/atomdeleted+xml"],["atomsvc","application/atomsvc+xml"],["atx","application/vnd.antix.game-component"],["au","audio/x-au"],["avi","video/x-msvideo"],["avif","image/avif"],["aw","application/applixware"],["azf","application/vnd.airzip.filesecure.azf"],["azs","application/vnd.airzip.filesecure.azs"],["azv","image/vnd.airzip.accelerator.azv"],["azw","application/vnd.amazon.ebook"],["b16","image/vnd.pco.b16"],["bat","application/x-msdownload"],["bcpio","application/x-bcpio"],["bdf","application/x-font-bdf"],["bdm","application/vnd.syncml.dm+wbxml"],["bdoc","application/x-bdoc"],["bed","application/vnd.realvnc.bed"],["bh2","application/vnd.fujitsu.oasysprs"],["bin","application/octet-stream"],["blb","application/x-blorb"],["blorb","application/x-blorb"],["bmi","application/vnd.bmi"],["bmml","application/vnd.balsamiq.bmml+xml"],["bmp","image/bmp"],["book","application/vnd.framemaker"],["box","application/vnd.previewsystems.box"],["boz","application/x-bzip2"],["bpk","application/octet-stream"],["bpmn","application/octet-stream"],["bsp","model/vnd.valve.source.compiled-map"],["btif","image/prs.btif"],["buffer","application/octet-stream"],["bz","application/x-bzip"],["bz2","application/x-bzip2"],["c","text/x-c"],["c4d","application/vnd.clonk.c4group"],["c4f","application/vnd.clonk.c4group"],["c4g","application/vnd.clonk.c4group"],["c4p","application/vnd.clonk.c4group"],["c4u","application/vnd.clonk.c4group"],["c11amc","application/vnd.cluetrust.cartomobile-config"],["c11amz","application/vnd.cluetrust.cartomobile-config-pkg"],["cab","application/vnd.ms-cab-compressed"],["caf","audio/x-caf"],["cap","application/vnd.tcpdump.pcap"],["car","application/vnd.curl.car"],["cat","application/vnd.ms-pki.seccat"],["cb7","application/x-cbr"],["cba","application/x-cbr"],["cbr","application/x-cbr"],["cbt","application/x-cbr"],["cbz","application/x-cbr"],["cc","text/x-c"],["cco","application/x-cocoa"],["cct","application/x-director"],["ccxml","application/ccxml+xml"],["cdbcmsg","application/vnd.contact.cmsg"],["cda","application/x-cdf"],["cdf","application/x-netcdf"],["cdfx","application/cdfx+xml"],["cdkey","application/vnd.mediastation.cdkey"],["cdmia","application/cdmi-capability"],["cdmic","application/cdmi-container"],["cdmid","application/cdmi-domain"],["cdmio","application/cdmi-object"],["cdmiq","application/cdmi-queue"],["cdr","application/cdr"],["cdx","chemical/x-cdx"],["cdxml","application/vnd.chemdraw+xml"],["cdy","application/vnd.cinderella"],["cer","application/pkix-cert"],["cfs","application/x-cfs-compressed"],["cgm","image/cgm"],["chat","application/x-chat"],["chm","application/vnd.ms-htmlhelp"],["chrt","application/vnd.kde.kchart"],["cif","chemical/x-cif"],["cii","application/vnd.anser-web-certificate-issue-initiation"],["cil","application/vnd.ms-artgalry"],["cjs","application/node"],["cla","application/vnd.claymore"],["class","application/octet-stream"],["clkk","application/vnd.crick.clicker.keyboard"],["clkp","application/vnd.crick.clicker.palette"],["clkt","application/vnd.crick.clicker.template"],["clkw","application/vnd.crick.clicker.wordbank"],["clkx","application/vnd.crick.clicker"],["clp","application/x-msclip"],["cmc","application/vnd.cosmocaller"],["cmdf","chemical/x-cmdf"],["cml","chemical/x-cml"],["cmp","application/vnd.yellowriver-custom-menu"],["cmx","image/x-cmx"],["cod","application/vnd.rim.cod"],["coffee","text/coffeescript"],["com","application/x-msdownload"],["conf","text/plain"],["cpio","application/x-cpio"],["cpp","text/x-c"],["cpt","application/mac-compactpro"],["crd","application/x-mscardfile"],["crl","application/pkix-crl"],["crt","application/x-x509-ca-cert"],["crx","application/x-chrome-extension"],["cryptonote","application/vnd.rig.cryptonote"],["csh","application/x-csh"],["csl","application/vnd.citationstyles.style+xml"],["csml","chemical/x-csml"],["csp","application/vnd.commonspace"],["csr","application/octet-stream"],["css","text/css"],["cst","application/x-director"],["csv","text/csv"],["cu","application/cu-seeme"],["curl","text/vnd.curl"],["cww","application/prs.cww"],["cxt","application/x-director"],["cxx","text/x-c"],["dae","model/vnd.collada+xml"],["daf","application/vnd.mobius.daf"],["dart","application/vnd.dart"],["dataless","application/vnd.fdsn.seed"],["davmount","application/davmount+xml"],["dbf","application/vnd.dbf"],["dbk","application/docbook+xml"],["dcr","application/x-director"],["dcurl","text/vnd.curl.dcurl"],["dd2","application/vnd.oma.dd2+xml"],["ddd","application/vnd.fujixerox.ddd"],["ddf","application/vnd.syncml.dmddf+xml"],["dds","image/vnd.ms-dds"],["deb","application/x-debian-package"],["def","text/plain"],["deploy","application/octet-stream"],["der","application/x-x509-ca-cert"],["dfac","application/vnd.dreamfactory"],["dgc","application/x-dgc-compressed"],["dic","text/x-c"],["dir","application/x-director"],["dis","application/vnd.mobius.dis"],["disposition-notification","message/disposition-notification"],["dist","application/octet-stream"],["distz","application/octet-stream"],["djv","image/vnd.djvu"],["djvu","image/vnd.djvu"],["dll","application/octet-stream"],["dmg","application/x-apple-diskimage"],["dmn","application/octet-stream"],["dmp","application/vnd.tcpdump.pcap"],["dms","application/octet-stream"],["dna","application/vnd.dna"],["doc","application/msword"],["docm","application/vnd.ms-word.template.macroEnabled.12"],["docx","application/vnd.openxmlformats-officedocument.wordprocessingml.document"],["dot","application/msword"],["dotm","application/vnd.ms-word.template.macroEnabled.12"],["dotx","application/vnd.openxmlformats-officedocument.wordprocessingml.template"],["dp","application/vnd.osgi.dp"],["dpg","application/vnd.dpgraph"],["dra","audio/vnd.dra"],["drle","image/dicom-rle"],["dsc","text/prs.lines.tag"],["dssc","application/dssc+der"],["dtb","application/x-dtbook+xml"],["dtd","application/xml-dtd"],["dts","audio/vnd.dts"],["dtshd","audio/vnd.dts.hd"],["dump","application/octet-stream"],["dvb","video/vnd.dvb.file"],["dvi","application/x-dvi"],["dwd","application/atsc-dwd+xml"],["dwf","model/vnd.dwf"],["dwg","image/vnd.dwg"],["dxf","image/vnd.dxf"],["dxp","application/vnd.spotfire.dxp"],["dxr","application/x-director"],["ear","application/java-archive"],["ecelp4800","audio/vnd.nuera.ecelp4800"],["ecelp7470","audio/vnd.nuera.ecelp7470"],["ecelp9600","audio/vnd.nuera.ecelp9600"],["ecma","application/ecmascript"],["edm","application/vnd.novadigm.edm"],["edx","application/vnd.novadigm.edx"],["efif","application/vnd.picsel"],["ei6","application/vnd.pg.osasli"],["elc","application/octet-stream"],["emf","image/emf"],["eml","message/rfc822"],["emma","application/emma+xml"],["emotionml","application/emotionml+xml"],["emz","application/x-msmetafile"],["eol","audio/vnd.digital-winds"],["eot","application/vnd.ms-fontobject"],["eps","application/postscript"],["epub","application/epub+zip"],["es","application/ecmascript"],["es3","application/vnd.eszigno3+xml"],["esa","application/vnd.osgi.subsystem"],["esf","application/vnd.epson.esf"],["et3","application/vnd.eszigno3+xml"],["etx","text/x-setext"],["eva","application/x-eva"],["evy","application/x-envoy"],["exe","application/octet-stream"],["exi","application/exi"],["exp","application/express"],["exr","image/aces"],["ext","application/vnd.novadigm.ext"],["ez","application/andrew-inset"],["ez2","application/vnd.ezpix-album"],["ez3","application/vnd.ezpix-package"],["f","text/x-fortran"],["f4v","video/mp4"],["f77","text/x-fortran"],["f90","text/x-fortran"],["fbs","image/vnd.fastbidsheet"],["fcdt","application/vnd.adobe.formscentral.fcdt"],["fcs","application/vnd.isac.fcs"],["fdf","application/vnd.fdf"],["fdt","application/fdt+xml"],["fe_launch","application/vnd.denovo.fcselayout-link"],["fg5","application/vnd.fujitsu.oasysgp"],["fgd","application/x-director"],["fh","image/x-freehand"],["fh4","image/x-freehand"],["fh5","image/x-freehand"],["fh7","image/x-freehand"],["fhc","image/x-freehand"],["fig","application/x-xfig"],["fits","image/fits"],["flac","audio/x-flac"],["fli","video/x-fli"],["flo","application/vnd.micrografx.flo"],["flv","video/x-flv"],["flw","application/vnd.kde.kivio"],["flx","text/vnd.fmi.flexstor"],["fly","text/vnd.fly"],["fm","application/vnd.framemaker"],["fnc","application/vnd.frogans.fnc"],["fo","application/vnd.software602.filler.form+xml"],["for","text/x-fortran"],["fpx","image/vnd.fpx"],["frame","application/vnd.framemaker"],["fsc","application/vnd.fsc.weblaunch"],["fst","image/vnd.fst"],["ftc","application/vnd.fluxtime.clip"],["fti","application/vnd.anser-web-funds-transfer-initiation"],["fvt","video/vnd.fvt"],["fxp","application/vnd.adobe.fxp"],["fxpl","application/vnd.adobe.fxp"],["fzs","application/vnd.fuzzysheet"],["g2w","application/vnd.geoplan"],["g3","image/g3fax"],["g3w","application/vnd.geospace"],["gac","application/vnd.groove-account"],["gam","application/x-tads"],["gbr","application/rpki-ghostbusters"],["gca","application/x-gca-compressed"],["gdl","model/vnd.gdl"],["gdoc","application/vnd.google-apps.document"],["geo","application/vnd.dynageo"],["geojson","application/geo+json"],["gex","application/vnd.geometry-explorer"],["ggb","application/vnd.geogebra.file"],["ggt","application/vnd.geogebra.tool"],["ghf","application/vnd.groove-help"],["gif","image/gif"],["gim","application/vnd.groove-identity-message"],["glb","model/gltf-binary"],["gltf","model/gltf+json"],["gml","application/gml+xml"],["gmx","application/vnd.gmx"],["gnumeric","application/x-gnumeric"],["gpg","application/gpg-keys"],["gph","application/vnd.flographit"],["gpx","application/gpx+xml"],["gqf","application/vnd.grafeq"],["gqs","application/vnd.grafeq"],["gram","application/srgs"],["gramps","application/x-gramps-xml"],["gre","application/vnd.geometry-explorer"],["grv","application/vnd.groove-injector"],["grxml","application/srgs+xml"],["gsf","application/x-font-ghostscript"],["gsheet","application/vnd.google-apps.spreadsheet"],["gslides","application/vnd.google-apps.presentation"],["gtar","application/x-gtar"],["gtm","application/vnd.groove-tool-message"],["gtw","model/vnd.gtw"],["gv","text/vnd.graphviz"],["gxf","application/gxf"],["gxt","application/vnd.geonext"],["gz","application/gzip"],["gzip","application/gzip"],["h","text/x-c"],["h261","video/h261"],["h263","video/h263"],["h264","video/h264"],["hal","application/vnd.hal+xml"],["hbci","application/vnd.hbci"],["hbs","text/x-handlebars-template"],["hdd","application/x-virtualbox-hdd"],["hdf","application/x-hdf"],["heic","image/heic"],["heics","image/heic-sequence"],["heif","image/heif"],["heifs","image/heif-sequence"],["hej2","image/hej2k"],["held","application/atsc-held+xml"],["hh","text/x-c"],["hjson","application/hjson"],["hlp","application/winhlp"],["hpgl","application/vnd.hp-hpgl"],["hpid","application/vnd.hp-hpid"],["hps","application/vnd.hp-hps"],["hqx","application/mac-binhex40"],["hsj2","image/hsj2"],["htc","text/x-component"],["htke","application/vnd.kenameaapp"],["htm","text/html"],["html","text/html"],["hvd","application/vnd.yamaha.hv-dic"],["hvp","application/vnd.yamaha.hv-voice"],["hvs","application/vnd.yamaha.hv-script"],["i2g","application/vnd.intergeo"],["icc","application/vnd.iccprofile"],["ice","x-conference/x-cooltalk"],["icm","application/vnd.iccprofile"],["ico","image/x-icon"],["ics","text/calendar"],["ief","image/ief"],["ifb","text/calendar"],["ifm","application/vnd.shana.informed.formdata"],["iges","model/iges"],["igl","application/vnd.igloader"],["igm","application/vnd.insors.igm"],["igs","model/iges"],["igx","application/vnd.micrografx.igx"],["iif","application/vnd.shana.informed.interchange"],["img","application/octet-stream"],["imp","application/vnd.accpac.simply.imp"],["ims","application/vnd.ms-ims"],["in","text/plain"],["ini","text/plain"],["ink","application/inkml+xml"],["inkml","application/inkml+xml"],["install","application/x-install-instructions"],["iota","application/vnd.astraea-software.iota"],["ipfix","application/ipfix"],["ipk","application/vnd.shana.informed.package"],["irm","application/vnd.ibm.rights-management"],["irp","application/vnd.irepository.package+xml"],["iso","application/x-iso9660-image"],["itp","application/vnd.shana.informed.formtemplate"],["its","application/its+xml"],["ivp","application/vnd.immervision-ivp"],["ivu","application/vnd.immervision-ivu"],["jad","text/vnd.sun.j2me.app-descriptor"],["jade","text/jade"],["jam","application/vnd.jam"],["jar","application/java-archive"],["jardiff","application/x-java-archive-diff"],["java","text/x-java-source"],["jhc","image/jphc"],["jisp","application/vnd.jisp"],["jls","image/jls"],["jlt","application/vnd.hp-jlyt"],["jng","image/x-jng"],["jnlp","application/x-java-jnlp-file"],["joda","application/vnd.joost.joda-archive"],["jp2","image/jp2"],["jpe","image/jpeg"],["jpeg","image/jpeg"],["jpf","image/jpx"],["jpg","image/jpeg"],["jpg2","image/jp2"],["jpgm","video/jpm"],["jpgv","video/jpeg"],["jph","image/jph"],["jpm","video/jpm"],["jpx","image/jpx"],["js","application/javascript"],["json","application/json"],["json5","application/json5"],["jsonld","application/ld+json"],["jsonl","application/jsonl"],["jsonml","application/jsonml+json"],["jsx","text/jsx"],["jxr","image/jxr"],["jxra","image/jxra"],["jxrs","image/jxrs"],["jxs","image/jxs"],["jxsc","image/jxsc"],["jxsi","image/jxsi"],["jxss","image/jxss"],["kar","audio/midi"],["karbon","application/vnd.kde.karbon"],["kdb","application/octet-stream"],["kdbx","application/x-keepass2"],["key","application/x-iwork-keynote-sffkey"],["kfo","application/vnd.kde.kformula"],["kia","application/vnd.kidspiration"],["kml","application/vnd.google-earth.kml+xml"],["kmz","application/vnd.google-earth.kmz"],["kne","application/vnd.kinar"],["knp","application/vnd.kinar"],["kon","application/vnd.kde.kontour"],["kpr","application/vnd.kde.kpresenter"],["kpt","application/vnd.kde.kpresenter"],["kpxx","application/vnd.ds-keypoint"],["ksp","application/vnd.kde.kspread"],["ktr","application/vnd.kahootz"],["ktx","image/ktx"],["ktx2","image/ktx2"],["ktz","application/vnd.kahootz"],["kwd","application/vnd.kde.kword"],["kwt","application/vnd.kde.kword"],["lasxml","application/vnd.las.las+xml"],["latex","application/x-latex"],["lbd","application/vnd.llamagraphics.life-balance.desktop"],["lbe","application/vnd.llamagraphics.life-balance.exchange+xml"],["les","application/vnd.hhe.lesson-player"],["less","text/less"],["lgr","application/lgr+xml"],["lha","application/octet-stream"],["link66","application/vnd.route66.link66+xml"],["list","text/plain"],["list3820","application/vnd.ibm.modcap"],["listafp","application/vnd.ibm.modcap"],["litcoffee","text/coffeescript"],["lnk","application/x-ms-shortcut"],["log","text/plain"],["lostxml","application/lost+xml"],["lrf","application/octet-stream"],["lrm","application/vnd.ms-lrm"],["ltf","application/vnd.frogans.ltf"],["lua","text/x-lua"],["luac","application/x-lua-bytecode"],["lvp","audio/vnd.lucent.voice"],["lwp","application/vnd.lotus-wordpro"],["lzh","application/octet-stream"],["m1v","video/mpeg"],["m2a","audio/mpeg"],["m2v","video/mpeg"],["m3a","audio/mpeg"],["m3u","text/plain"],["m3u8","application/vnd.apple.mpegurl"],["m4a","audio/x-m4a"],["m4p","application/mp4"],["m4s","video/iso.segment"],["m4u","application/vnd.mpegurl"],["m4v","video/x-m4v"],["m13","application/x-msmediaview"],["m14","application/x-msmediaview"],["m21","application/mp21"],["ma","application/mathematica"],["mads","application/mads+xml"],["maei","application/mmt-aei+xml"],["mag","application/vnd.ecowin.chart"],["maker","application/vnd.framemaker"],["man","text/troff"],["manifest","text/cache-manifest"],["map","application/json"],["mar","application/octet-stream"],["markdown","text/markdown"],["mathml","application/mathml+xml"],["mb","application/mathematica"],["mbk","application/vnd.mobius.mbk"],["mbox","application/mbox"],["mc1","application/vnd.medcalcdata"],["mcd","application/vnd.mcd"],["mcurl","text/vnd.curl.mcurl"],["md","text/markdown"],["mdb","application/x-msaccess"],["mdi","image/vnd.ms-modi"],["mdx","text/mdx"],["me","text/troff"],["mesh","model/mesh"],["meta4","application/metalink4+xml"],["metalink","application/metalink+xml"],["mets","application/mets+xml"],["mfm","application/vnd.mfmp"],["mft","application/rpki-manifest"],["mgp","application/vnd.osgeo.mapguide.package"],["mgz","application/vnd.proteus.magazine"],["mid","audio/midi"],["midi","audio/midi"],["mie","application/x-mie"],["mif","application/vnd.mif"],["mime","message/rfc822"],["mj2","video/mj2"],["mjp2","video/mj2"],["mjs","application/javascript"],["mk3d","video/x-matroska"],["mka","audio/x-matroska"],["mkd","text/x-markdown"],["mks","video/x-matroska"],["mkv","video/x-matroska"],["mlp","application/vnd.dolby.mlp"],["mmd","application/vnd.chipnuts.karaoke-mmd"],["mmf","application/vnd.smaf"],["mml","text/mathml"],["mmr","image/vnd.fujixerox.edmics-mmr"],["mng","video/x-mng"],["mny","application/x-msmoney"],["mobi","application/x-mobipocket-ebook"],["mods","application/mods+xml"],["mov","video/quicktime"],["movie","video/x-sgi-movie"],["mp2","audio/mpeg"],["mp2a","audio/mpeg"],["mp3","audio/mpeg"],["mp4","video/mp4"],["mp4a","audio/mp4"],["mp4s","application/mp4"],["mp4v","video/mp4"],["mp21","application/mp21"],["mpc","application/vnd.mophun.certificate"],["mpd","application/dash+xml"],["mpe","video/mpeg"],["mpeg","video/mpeg"],["mpg","video/mpeg"],["mpg4","video/mp4"],["mpga","audio/mpeg"],["mpkg","application/vnd.apple.installer+xml"],["mpm","application/vnd.blueice.multipass"],["mpn","application/vnd.mophun.application"],["mpp","application/vnd.ms-project"],["mpt","application/vnd.ms-project"],["mpy","application/vnd.ibm.minipay"],["mqy","application/vnd.mobius.mqy"],["mrc","application/marc"],["mrcx","application/marcxml+xml"],["ms","text/troff"],["mscml","application/mediaservercontrol+xml"],["mseed","application/vnd.fdsn.mseed"],["mseq","application/vnd.mseq"],["msf","application/vnd.epson.msf"],["msg","application/vnd.ms-outlook"],["msh","model/mesh"],["msi","application/x-msdownload"],["msl","application/vnd.mobius.msl"],["msm","application/octet-stream"],["msp","application/octet-stream"],["msty","application/vnd.muvee.style"],["mtl","model/mtl"],["mts","model/vnd.mts"],["mus","application/vnd.musician"],["musd","application/mmt-usd+xml"],["musicxml","application/vnd.recordare.musicxml+xml"],["mvb","application/x-msmediaview"],["mvt","application/vnd.mapbox-vector-tile"],["mwf","application/vnd.mfer"],["mxf","application/mxf"],["mxl","application/vnd.recordare.musicxml"],["mxmf","audio/mobile-xmf"],["mxml","application/xv+xml"],["mxs","application/vnd.triscape.mxs"],["mxu","video/vnd.mpegurl"],["n-gage","application/vnd.nokia.n-gage.symbian.install"],["n3","text/n3"],["nb","application/mathematica"],["nbp","application/vnd.wolfram.player"],["nc","application/x-netcdf"],["ncx","application/x-dtbncx+xml"],["nfo","text/x-nfo"],["ngdat","application/vnd.nokia.n-gage.data"],["nitf","application/vnd.nitf"],["nlu","application/vnd.neurolanguage.nlu"],["nml","application/vnd.enliven"],["nnd","application/vnd.noblenet-directory"],["nns","application/vnd.noblenet-sealer"],["nnw","application/vnd.noblenet-web"],["npx","image/vnd.net-fpx"],["nq","application/n-quads"],["nsc","application/x-conference"],["nsf","application/vnd.lotus-notes"],["nt","application/n-triples"],["ntf","application/vnd.nitf"],["numbers","application/x-iwork-numbers-sffnumbers"],["nzb","application/x-nzb"],["oa2","application/vnd.fujitsu.oasys2"],["oa3","application/vnd.fujitsu.oasys3"],["oas","application/vnd.fujitsu.oasys"],["obd","application/x-msbinder"],["obgx","application/vnd.openblox.game+xml"],["obj","model/obj"],["oda","application/oda"],["odb","application/vnd.oasis.opendocument.database"],["odc","application/vnd.oasis.opendocument.chart"],["odf","application/vnd.oasis.opendocument.formula"],["odft","application/vnd.oasis.opendocument.formula-template"],["odg","application/vnd.oasis.opendocument.graphics"],["odi","application/vnd.oasis.opendocument.image"],["odm","application/vnd.oasis.opendocument.text-master"],["odp","application/vnd.oasis.opendocument.presentation"],["ods","application/vnd.oasis.opendocument.spreadsheet"],["odt","application/vnd.oasis.opendocument.text"],["oga","audio/ogg"],["ogex","model/vnd.opengex"],["ogg","audio/ogg"],["ogv","video/ogg"],["ogx","application/ogg"],["omdoc","application/omdoc+xml"],["onepkg","application/onenote"],["onetmp","application/onenote"],["onetoc","application/onenote"],["onetoc2","application/onenote"],["opf","application/oebps-package+xml"],["opml","text/x-opml"],["oprc","application/vnd.palm"],["opus","audio/ogg"],["org","text/x-org"],["osf","application/vnd.yamaha.openscoreformat"],["osfpvg","application/vnd.yamaha.openscoreformat.osfpvg+xml"],["osm","application/vnd.openstreetmap.data+xml"],["otc","application/vnd.oasis.opendocument.chart-template"],["otf","font/otf"],["otg","application/vnd.oasis.opendocument.graphics-template"],["oth","application/vnd.oasis.opendocument.text-web"],["oti","application/vnd.oasis.opendocument.image-template"],["otp","application/vnd.oasis.opendocument.presentation-template"],["ots","application/vnd.oasis.opendocument.spreadsheet-template"],["ott","application/vnd.oasis.opendocument.text-template"],["ova","application/x-virtualbox-ova"],["ovf","application/x-virtualbox-ovf"],["owl","application/rdf+xml"],["oxps","application/oxps"],["oxt","application/vnd.openofficeorg.extension"],["p","text/x-pascal"],["p7a","application/x-pkcs7-signature"],["p7b","application/x-pkcs7-certificates"],["p7c","application/pkcs7-mime"],["p7m","application/pkcs7-mime"],["p7r","application/x-pkcs7-certreqresp"],["p7s","application/pkcs7-signature"],["p8","application/pkcs8"],["p10","application/x-pkcs10"],["p12","application/x-pkcs12"],["pac","application/x-ns-proxy-autoconfig"],["pages","application/x-iwork-pages-sffpages"],["pas","text/x-pascal"],["paw","application/vnd.pawaafile"],["pbd","application/vnd.powerbuilder6"],["pbm","image/x-portable-bitmap"],["pcap","application/vnd.tcpdump.pcap"],["pcf","application/x-font-pcf"],["pcl","application/vnd.hp-pcl"],["pclxl","application/vnd.hp-pclxl"],["pct","image/x-pict"],["pcurl","application/vnd.curl.pcurl"],["pcx","image/x-pcx"],["pdb","application/x-pilot"],["pde","text/x-processing"],["pdf","application/pdf"],["pem","application/x-x509-user-cert"],["pfa","application/x-font-type1"],["pfb","application/x-font-type1"],["pfm","application/x-font-type1"],["pfr","application/font-tdpfr"],["pfx","application/x-pkcs12"],["pgm","image/x-portable-graymap"],["pgn","application/x-chess-pgn"],["pgp","application/pgp"],["php","application/x-httpd-php"],["php3","application/x-httpd-php"],["php4","application/x-httpd-php"],["phps","application/x-httpd-php-source"],["phtml","application/x-httpd-php"],["pic","image/x-pict"],["pkg","application/octet-stream"],["pki","application/pkixcmp"],["pkipath","application/pkix-pkipath"],["pkpass","application/vnd.apple.pkpass"],["pl","application/x-perl"],["plb","application/vnd.3gpp.pic-bw-large"],["plc","application/vnd.mobius.plc"],["plf","application/vnd.pocketlearn"],["pls","application/pls+xml"],["pm","application/x-perl"],["pml","application/vnd.ctc-posml"],["png","image/png"],["pnm","image/x-portable-anymap"],["portpkg","application/vnd.macports.portpkg"],["pot","application/vnd.ms-powerpoint"],["potm","application/vnd.ms-powerpoint.presentation.macroEnabled.12"],["potx","application/vnd.openxmlformats-officedocument.presentationml.template"],["ppa","application/vnd.ms-powerpoint"],["ppam","application/vnd.ms-powerpoint.addin.macroEnabled.12"],["ppd","application/vnd.cups-ppd"],["ppm","image/x-portable-pixmap"],["pps","application/vnd.ms-powerpoint"],["ppsm","application/vnd.ms-powerpoint.slideshow.macroEnabled.12"],["ppsx","application/vnd.openxmlformats-officedocument.presentationml.slideshow"],["ppt","application/powerpoint"],["pptm","application/vnd.ms-powerpoint.presentation.macroEnabled.12"],["pptx","application/vnd.openxmlformats-officedocument.presentationml.presentation"],["pqa","application/vnd.palm"],["prc","application/x-pilot"],["pre","application/vnd.lotus-freelance"],["prf","application/pics-rules"],["provx","application/provenance+xml"],["ps","application/postscript"],["psb","application/vnd.3gpp.pic-bw-small"],["psd","application/x-photoshop"],["psf","application/x-font-linux-psf"],["pskcxml","application/pskc+xml"],["pti","image/prs.pti"],["ptid","application/vnd.pvi.ptid1"],["pub","application/x-mspublisher"],["pvb","application/vnd.3gpp.pic-bw-var"],["pwn","application/vnd.3m.post-it-notes"],["pya","audio/vnd.ms-playready.media.pya"],["pyv","video/vnd.ms-playready.media.pyv"],["qam","application/vnd.epson.quickanime"],["qbo","application/vnd.intu.qbo"],["qfx","application/vnd.intu.qfx"],["qps","application/vnd.publishare-delta-tree"],["qt","video/quicktime"],["qwd","application/vnd.quark.quarkxpress"],["qwt","application/vnd.quark.quarkxpress"],["qxb","application/vnd.quark.quarkxpress"],["qxd","application/vnd.quark.quarkxpress"],["qxl","application/vnd.quark.quarkxpress"],["qxt","application/vnd.quark.quarkxpress"],["ra","audio/x-realaudio"],["ram","audio/x-pn-realaudio"],["raml","application/raml+yaml"],["rapd","application/route-apd+xml"],["rar","application/x-rar"],["ras","image/x-cmu-raster"],["rcprofile","application/vnd.ipunplugged.rcprofile"],["rdf","application/rdf+xml"],["rdz","application/vnd.data-vision.rdz"],["relo","application/p2p-overlay+xml"],["rep","application/vnd.businessobjects"],["res","application/x-dtbresource+xml"],["rgb","image/x-rgb"],["rif","application/reginfo+xml"],["rip","audio/vnd.rip"],["ris","application/x-research-info-systems"],["rl","application/resource-lists+xml"],["rlc","image/vnd.fujixerox.edmics-rlc"],["rld","application/resource-lists-diff+xml"],["rm","audio/x-pn-realaudio"],["rmi","audio/midi"],["rmp","audio/x-pn-realaudio-plugin"],["rms","application/vnd.jcp.javame.midlet-rms"],["rmvb","application/vnd.rn-realmedia-vbr"],["rnc","application/relax-ng-compact-syntax"],["rng","application/xml"],["roa","application/rpki-roa"],["roff","text/troff"],["rp9","application/vnd.cloanto.rp9"],["rpm","audio/x-pn-realaudio-plugin"],["rpss","application/vnd.nokia.radio-presets"],["rpst","application/vnd.nokia.radio-preset"],["rq","application/sparql-query"],["rs","application/rls-services+xml"],["rsa","application/x-pkcs7"],["rsat","application/atsc-rsat+xml"],["rsd","application/rsd+xml"],["rsheet","application/urc-ressheet+xml"],["rss","application/rss+xml"],["rtf","text/rtf"],["rtx","text/richtext"],["run","application/x-makeself"],["rusd","application/route-usd+xml"],["rv","video/vnd.rn-realvideo"],["s","text/x-asm"],["s3m","audio/s3m"],["saf","application/vnd.yamaha.smaf-audio"],["sass","text/x-sass"],["sbml","application/sbml+xml"],["sc","application/vnd.ibm.secure-container"],["scd","application/x-msschedule"],["scm","application/vnd.lotus-screencam"],["scq","application/scvp-cv-request"],["scs","application/scvp-cv-response"],["scss","text/x-scss"],["scurl","text/vnd.curl.scurl"],["sda","application/vnd.stardivision.draw"],["sdc","application/vnd.stardivision.calc"],["sdd","application/vnd.stardivision.impress"],["sdkd","application/vnd.solent.sdkm+xml"],["sdkm","application/vnd.solent.sdkm+xml"],["sdp","application/sdp"],["sdw","application/vnd.stardivision.writer"],["sea","application/octet-stream"],["see","application/vnd.seemail"],["seed","application/vnd.fdsn.seed"],["sema","application/vnd.sema"],["semd","application/vnd.semd"],["semf","application/vnd.semf"],["senmlx","application/senml+xml"],["sensmlx","application/sensml+xml"],["ser","application/java-serialized-object"],["setpay","application/set-payment-initiation"],["setreg","application/set-registration-initiation"],["sfd-hdstx","application/vnd.hydrostatix.sof-data"],["sfs","application/vnd.spotfire.sfs"],["sfv","text/x-sfv"],["sgi","image/sgi"],["sgl","application/vnd.stardivision.writer-global"],["sgm","text/sgml"],["sgml","text/sgml"],["sh","application/x-sh"],["shar","application/x-shar"],["shex","text/shex"],["shf","application/shf+xml"],["shtml","text/html"],["sid","image/x-mrsid-image"],["sieve","application/sieve"],["sig","application/pgp-signature"],["sil","audio/silk"],["silo","model/mesh"],["sis","application/vnd.symbian.install"],["sisx","application/vnd.symbian.install"],["sit","application/x-stuffit"],["sitx","application/x-stuffitx"],["siv","application/sieve"],["skd","application/vnd.koan"],["skm","application/vnd.koan"],["skp","application/vnd.koan"],["skt","application/vnd.koan"],["sldm","application/vnd.ms-powerpoint.slide.macroenabled.12"],["sldx","application/vnd.openxmlformats-officedocument.presentationml.slide"],["slim","text/slim"],["slm","text/slim"],["sls","application/route-s-tsid+xml"],["slt","application/vnd.epson.salt"],["sm","application/vnd.stepmania.stepchart"],["smf","application/vnd.stardivision.math"],["smi","application/smil"],["smil","application/smil"],["smv","video/x-smv"],["smzip","application/vnd.stepmania.package"],["snd","audio/basic"],["snf","application/x-font-snf"],["so","application/octet-stream"],["spc","application/x-pkcs7-certificates"],["spdx","text/spdx"],["spf","application/vnd.yamaha.smaf-phrase"],["spl","application/x-futuresplash"],["spot","text/vnd.in3d.spot"],["spp","application/scvp-vp-response"],["spq","application/scvp-vp-request"],["spx","audio/ogg"],["sql","application/x-sql"],["src","application/x-wais-source"],["srt","application/x-subrip"],["sru","application/sru+xml"],["srx","application/sparql-results+xml"],["ssdl","application/ssdl+xml"],["sse","application/vnd.kodak-descriptor"],["ssf","application/vnd.epson.ssf"],["ssml","application/ssml+xml"],["sst","application/octet-stream"],["st","application/vnd.sailingtracker.track"],["stc","application/vnd.sun.xml.calc.template"],["std","application/vnd.sun.xml.draw.template"],["stf","application/vnd.wt.stf"],["sti","application/vnd.sun.xml.impress.template"],["stk","application/hyperstudio"],["stl","model/stl"],["stpx","model/step+xml"],["stpxz","model/step-xml+zip"],["stpz","model/step+zip"],["str","application/vnd.pg.format"],["stw","application/vnd.sun.xml.writer.template"],["styl","text/stylus"],["stylus","text/stylus"],["sub","text/vnd.dvb.subtitle"],["sus","application/vnd.sus-calendar"],["susp","application/vnd.sus-calendar"],["sv4cpio","application/x-sv4cpio"],["sv4crc","application/x-sv4crc"],["svc","application/vnd.dvb.service"],["svd","application/vnd.svd"],["svg","image/svg+xml"],["svgz","image/svg+xml"],["swa","application/x-director"],["swf","application/x-shockwave-flash"],["swi","application/vnd.aristanetworks.swi"],["swidtag","application/swid+xml"],["sxc","application/vnd.sun.xml.calc"],["sxd","application/vnd.sun.xml.draw"],["sxg","application/vnd.sun.xml.writer.global"],["sxi","application/vnd.sun.xml.impress"],["sxm","application/vnd.sun.xml.math"],["sxw","application/vnd.sun.xml.writer"],["t","text/troff"],["t3","application/x-t3vm-image"],["t38","image/t38"],["taglet","application/vnd.mynfc"],["tao","application/vnd.tao.intent-module-archive"],["tap","image/vnd.tencent.tap"],["tar","application/x-tar"],["tcap","application/vnd.3gpp2.tcap"],["tcl","application/x-tcl"],["td","application/urc-targetdesc+xml"],["teacher","application/vnd.smart.teacher"],["tei","application/tei+xml"],["teicorpus","application/tei+xml"],["tex","application/x-tex"],["texi","application/x-texinfo"],["texinfo","application/x-texinfo"],["text","text/plain"],["tfi","application/thraud+xml"],["tfm","application/x-tex-tfm"],["tfx","image/tiff-fx"],["tga","image/x-tga"],["tgz","application/x-tar"],["thmx","application/vnd.ms-officetheme"],["tif","image/tiff"],["tiff","image/tiff"],["tk","application/x-tcl"],["tmo","application/vnd.tmobile-livetv"],["toml","application/toml"],["torrent","application/x-bittorrent"],["tpl","application/vnd.groove-tool-template"],["tpt","application/vnd.trid.tpt"],["tr","text/troff"],["tra","application/vnd.trueapp"],["trig","application/trig"],["trm","application/x-msterminal"],["ts","video/mp2t"],["tsd","application/timestamped-data"],["tsv","text/tab-separated-values"],["ttc","font/collection"],["ttf","font/ttf"],["ttl","text/turtle"],["ttml","application/ttml+xml"],["twd","application/vnd.simtech-mindmapper"],["twds","application/vnd.simtech-mindmapper"],["txd","application/vnd.genomatix.tuxedo"],["txf","application/vnd.mobius.txf"],["txt","text/plain"],["u8dsn","message/global-delivery-status"],["u8hdr","message/global-headers"],["u8mdn","message/global-disposition-notification"],["u8msg","message/global"],["u32","application/x-authorware-bin"],["ubj","application/ubjson"],["udeb","application/x-debian-package"],["ufd","application/vnd.ufdl"],["ufdl","application/vnd.ufdl"],["ulx","application/x-glulx"],["umj","application/vnd.umajin"],["unityweb","application/vnd.unity"],["uoml","application/vnd.uoml+xml"],["uri","text/uri-list"],["uris","text/uri-list"],["urls","text/uri-list"],["usdz","model/vnd.usdz+zip"],["ustar","application/x-ustar"],["utz","application/vnd.uiq.theme"],["uu","text/x-uuencode"],["uva","audio/vnd.dece.audio"],["uvd","application/vnd.dece.data"],["uvf","application/vnd.dece.data"],["uvg","image/vnd.dece.graphic"],["uvh","video/vnd.dece.hd"],["uvi","image/vnd.dece.graphic"],["uvm","video/vnd.dece.mobile"],["uvp","video/vnd.dece.pd"],["uvs","video/vnd.dece.sd"],["uvt","application/vnd.dece.ttml+xml"],["uvu","video/vnd.uvvu.mp4"],["uvv","video/vnd.dece.video"],["uvva","audio/vnd.dece.audio"],["uvvd","application/vnd.dece.data"],["uvvf","application/vnd.dece.data"],["uvvg","image/vnd.dece.graphic"],["uvvh","video/vnd.dece.hd"],["uvvi","image/vnd.dece.graphic"],["uvvm","video/vnd.dece.mobile"],["uvvp","video/vnd.dece.pd"],["uvvs","video/vnd.dece.sd"],["uvvt","application/vnd.dece.ttml+xml"],["uvvu","video/vnd.uvvu.mp4"],["uvvv","video/vnd.dece.video"],["uvvx","application/vnd.dece.unspecified"],["uvvz","application/vnd.dece.zip"],["uvx","application/vnd.dece.unspecified"],["uvz","application/vnd.dece.zip"],["vbox","application/x-virtualbox-vbox"],["vbox-extpack","application/x-virtualbox-vbox-extpack"],["vcard","text/vcard"],["vcd","application/x-cdlink"],["vcf","text/x-vcard"],["vcg","application/vnd.groove-vcard"],["vcs","text/x-vcalendar"],["vcx","application/vnd.vcx"],["vdi","application/x-virtualbox-vdi"],["vds","model/vnd.sap.vds"],["vhd","application/x-virtualbox-vhd"],["vis","application/vnd.visionary"],["viv","video/vnd.vivo"],["vlc","application/videolan"],["vmdk","application/x-virtualbox-vmdk"],["vob","video/x-ms-vob"],["vor","application/vnd.stardivision.writer"],["vox","application/x-authorware-bin"],["vrml","model/vrml"],["vsd","application/vnd.visio"],["vsf","application/vnd.vsf"],["vss","application/vnd.visio"],["vst","application/vnd.visio"],["vsw","application/vnd.visio"],["vtf","image/vnd.valve.source.texture"],["vtt","text/vtt"],["vtu","model/vnd.vtu"],["vxml","application/voicexml+xml"],["w3d","application/x-director"],["wad","application/x-doom"],["wadl","application/vnd.sun.wadl+xml"],["war","application/java-archive"],["wasm","application/wasm"],["wav","audio/x-wav"],["wax","audio/x-ms-wax"],["wbmp","image/vnd.wap.wbmp"],["wbs","application/vnd.criticaltools.wbs+xml"],["wbxml","application/wbxml"],["wcm","application/vnd.ms-works"],["wdb","application/vnd.ms-works"],["wdp","image/vnd.ms-photo"],["weba","audio/webm"],["webapp","application/x-web-app-manifest+json"],["webm","video/webm"],["webmanifest","application/manifest+json"],["webp","image/webp"],["wg","application/vnd.pmi.widget"],["wgt","application/widget"],["wks","application/vnd.ms-works"],["wm","video/x-ms-wm"],["wma","audio/x-ms-wma"],["wmd","application/x-ms-wmd"],["wmf","image/wmf"],["wml","text/vnd.wap.wml"],["wmlc","application/wmlc"],["wmls","text/vnd.wap.wmlscript"],["wmlsc","application/vnd.wap.wmlscriptc"],["wmv","video/x-ms-wmv"],["wmx","video/x-ms-wmx"],["wmz","application/x-msmetafile"],["woff","font/woff"],["woff2","font/woff2"],["word","application/msword"],["wpd","application/vnd.wordperfect"],["wpl","application/vnd.ms-wpl"],["wps","application/vnd.ms-works"],["wqd","application/vnd.wqd"],["wri","application/x-mswrite"],["wrl","model/vrml"],["wsc","message/vnd.wfa.wsc"],["wsdl","application/wsdl+xml"],["wspolicy","application/wspolicy+xml"],["wtb","application/vnd.webturbo"],["wvx","video/x-ms-wvx"],["x3d","model/x3d+xml"],["x3db","model/x3d+fastinfoset"],["x3dbz","model/x3d+binary"],["x3dv","model/x3d-vrml"],["x3dvz","model/x3d+vrml"],["x3dz","model/x3d+xml"],["x32","application/x-authorware-bin"],["x_b","model/vnd.parasolid.transmit.binary"],["x_t","model/vnd.parasolid.transmit.text"],["xaml","application/xaml+xml"],["xap","application/x-silverlight-app"],["xar","application/vnd.xara"],["xav","application/xcap-att+xml"],["xbap","application/x-ms-xbap"],["xbd","application/vnd.fujixerox.docuworks.binder"],["xbm","image/x-xbitmap"],["xca","application/xcap-caps+xml"],["xcs","application/calendar+xml"],["xdf","application/xcap-diff+xml"],["xdm","application/vnd.syncml.dm+xml"],["xdp","application/vnd.adobe.xdp+xml"],["xdssc","application/dssc+xml"],["xdw","application/vnd.fujixerox.docuworks"],["xel","application/xcap-el+xml"],["xenc","application/xenc+xml"],["xer","application/patch-ops-error+xml"],["xfdf","application/vnd.adobe.xfdf"],["xfdl","application/vnd.xfdl"],["xht","application/xhtml+xml"],["xhtml","application/xhtml+xml"],["xhvml","application/xv+xml"],["xif","image/vnd.xiff"],["xl","application/excel"],["xla","application/vnd.ms-excel"],["xlam","application/vnd.ms-excel.addin.macroEnabled.12"],["xlc","application/vnd.ms-excel"],["xlf","application/xliff+xml"],["xlm","application/vnd.ms-excel"],["xls","application/vnd.ms-excel"],["xlsb","application/vnd.ms-excel.sheet.binary.macroEnabled.12"],["xlsm","application/vnd.ms-excel.sheet.macroEnabled.12"],["xlsx","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],["xlt","application/vnd.ms-excel"],["xltm","application/vnd.ms-excel.template.macroEnabled.12"],["xltx","application/vnd.openxmlformats-officedocument.spreadsheetml.template"],["xlw","application/vnd.ms-excel"],["xm","audio/xm"],["xml","application/xml"],["xns","application/xcap-ns+xml"],["xo","application/vnd.olpc-sugar"],["xop","application/xop+xml"],["xpi","application/x-xpinstall"],["xpl","application/xproc+xml"],["xpm","image/x-xpixmap"],["xpr","application/vnd.is-xpr"],["xps","application/vnd.ms-xpsdocument"],["xpw","application/vnd.intercon.formnet"],["xpx","application/vnd.intercon.formnet"],["xsd","application/xml"],["xsl","application/xml"],["xslt","application/xslt+xml"],["xsm","application/vnd.syncml+xml"],["xspf","application/xspf+xml"],["xul","application/vnd.mozilla.xul+xml"],["xvm","application/xv+xml"],["xvml","application/xv+xml"],["xwd","image/x-xwindowdump"],["xyz","chemical/x-xyz"],["xz","application/x-xz"],["yaml","text/yaml"],["yang","application/yang"],["yin","application/yin+xml"],["yml","text/yaml"],["ymp","text/x-suse-ymp"],["z","application/x-compress"],["z1","application/x-zmachine"],["z2","application/x-zmachine"],["z3","application/x-zmachine"],["z4","application/x-zmachine"],["z5","application/x-zmachine"],["z6","application/x-zmachine"],["z7","application/x-zmachine"],["z8","application/x-zmachine"],["zaz","application/vnd.zzazz.deck+xml"],["zip","application/zip"],["zir","application/vnd.zul"],["zirz","application/vnd.zul"],["zmm","application/vnd.handheld-entertainment+xml"],["zsh","text/x-scriptzsh"]]);function r(a,e,i){let t=function(a){let{name:e}=a;if(e&&-1!==e.lastIndexOf(".")&&!a.type){let i=e.split(".").pop().toLowerCase(),t=p.get(i);t&&Object.defineProperty(a,"type",{value:t,writable:!1,configurable:!1,enumerable:!0})}return a}(a),{webkitRelativePath:n}=a,o="string"==typeof e?e:"string"==typeof n&&n.length>0?n:`./${a.name}`;return"string"!=typeof t.path&&l(t,"path",o),void 0!==i&&Object.defineProperty(t,"handle",{value:i,writable:!1,configurable:!1,enumerable:!0}),l(t,"relativePath",o),t}function l(a,e,i){Object.defineProperty(a,e,{value:i,writable:!1,configurable:!1,enumerable:!0})}let c=[".DS_Store","Thumbs.db"];function s(a){return"object"==typeof a&&null!==a}function d(a){return a.filter(a=>-1===c.indexOf(a.name))}function m(a){if(null===a)return[];let e=[];for(let i=0;i<a.length;i++){let t=a[i];e.push(t)}return e}function u(a){if("function"!=typeof a.webkitGetAsEntry)return v(a);let e=a.webkitGetAsEntry();return e&&e.isDirectory?f(e):v(a,e)}function v(a,e){return o(this,void 0,void 0,function*(){var i;if(globalThis.isSecureContext&&"function"==typeof a.getAsFileSystemHandle){let e=yield a.getAsFileSystemHandle();if(null===e)throw Error(`${a} is not a File`);if(void 0!==e){let a=yield e.getFile();return a.handle=e,r(a)}}let t=a.getAsFile();if(!t)throw Error(`${a} is not a File`);return r(t,null!=(i=null==e?void 0:e.fullPath)?i:void 0)})}function x(a){return o(this,void 0,void 0,function*(){return a.isDirectory?f(a):function(a){return o(this,void 0,void 0,function*(){return new Promise((e,i)=>{a.file(i=>{e(r(i,a.fullPath))},a=>{i(a)})})})}(a)})}function f(a){let e=a.createReader();return new Promise((a,i)=>{let t=[];!function n(){e.readEntries(e=>o(this,void 0,void 0,function*(){if(e.length){let a=Promise.all(e.map(x));t.push(a),n()}else try{let e=yield Promise.all(t);a(e)}catch(a){i(a)}}),a=>{i(a)})}()})}var g=a.i(75592);function b(a){return function(a){if(Array.isArray(a))return z(a)}(a)||function(a){if("u">typeof Symbol&&null!=a[Symbol.iterator]||null!=a["@@iterator"])return Array.from(a)}(a)||j(a)||function(){throw TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function h(a,e){var i=Object.keys(a);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(a);e&&(t=t.filter(function(e){return Object.getOwnPropertyDescriptor(a,e).enumerable})),i.push.apply(i,t)}return i}function y(a){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?h(Object(i),!0).forEach(function(e){k(a,e,i[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(i)):h(Object(i)).forEach(function(e){Object.defineProperty(a,e,Object.getOwnPropertyDescriptor(i,e))})}return a}function k(a,e,i){return e in a?Object.defineProperty(a,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):a[e]=i,a}function w(a,e){return function(a){if(Array.isArray(a))return a}(a)||function(a,e){var i,t,n=null==a?null:"u">typeof Symbol&&a[Symbol.iterator]||a["@@iterator"];if(null!=n){var o=[],p=!0,r=!1;try{for(n=n.call(a);!(p=(i=n.next()).done)&&(o.push(i.value),!e||o.length!==e);p=!0);}catch(a){r=!0,t=a}finally{try{p||null==n.return||n.return()}finally{if(r)throw t}}return o}}(a,e)||j(a,e)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function j(a,e){if(a){if("string"==typeof a)return z(a,e);var i=Object.prototype.toString.call(a).slice(8,-1);if("Object"===i&&a.constructor&&(i=a.constructor.name),"Map"===i||"Set"===i)return Array.from(a);if("Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i))return z(a,e)}}function z(a,e){(null==e||e>a.length)&&(e=a.length);for(var i=0,t=Array(e);i<e;i++)t[i]=a[i];return t}var D="function"==typeof g.default?g.default:g.default.default,q=function(){var a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",e=a.split(","),i=e.length>1?"one of ".concat(e.join(", ")):e[0];return{code:"file-invalid-type",message:"File type must be ".concat(i)}},E=function(a){return{code:"file-too-large",message:"File is larger than ".concat(a," ").concat(1===a?"byte":"bytes")}},C=function(a){return{code:"file-too-small",message:"File is smaller than ".concat(a," ").concat(1===a?"byte":"bytes")}},O={code:"too-many-files",message:"Too many files"};function P(a,e){var i="application/x-moz-file"===a.type||D(a,e)||""===a.type&&"function"==typeof a.getAsFile;return[i,i?null:q(e)]}function T(a,e,i){if(F(a.size)){if(F(e)&&F(i)){if(a.size>i)return[!1,E(i)];if(a.size<e)return[!1,C(e)]}else if(F(e)&&a.size<e)return[!1,C(e)];else if(F(i)&&a.size>i)return[!1,E(i)]}return[!0,null]}function F(a){return null!=a}function S(a){return"function"==typeof a.isPropagationStopped?a.isPropagationStopped():void 0!==a.cancelBubble&&a.cancelBubble}function A(a){return a.dataTransfer?Array.prototype.some.call(a.dataTransfer.types,function(a){return"Files"===a||"application/x-moz-file"===a}):!!a.target&&!!a.target.files}function R(a){a.preventDefault()}function I(){for(var a=arguments.length,e=Array(a),i=0;i<a;i++)e[i]=arguments[i];return function(a){for(var i=arguments.length,t=Array(i>1?i-1:0),n=1;n<i;n++)t[n-1]=arguments[n];return e.some(function(e){return!S(a)&&e&&e.apply(void 0,[a].concat(t)),S(a)})}}function Q(a){return"audio/*"===a||"video/*"===a||"image/*"===a||"text/*"===a||"application/*"===a||/\w+\/[-+.\w]+/g.test(a)}function N(a){return/^.*\.[\w]+$/.test(a)}var M=["children"],L=["open"],B=["refKey","role","onKeyDown","onFocus","onBlur","onClick","onDragEnter","onDragOver","onDragLeave","onDrop"],_=["refKey","onChange","onClick"];function K(a){return function(a){if(Array.isArray(a))return W(a)}(a)||function(a){if("u">typeof Symbol&&null!=a[Symbol.iterator]||null!=a["@@iterator"])return Array.from(a)}(a)||U(a)||function(){throw TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function G(a,e){return function(a){if(Array.isArray(a))return a}(a)||function(a,e){var i,t,n=null==a?null:"u">typeof Symbol&&a[Symbol.iterator]||a["@@iterator"];if(null!=n){var o=[],p=!0,r=!1;try{for(n=n.call(a);!(p=(i=n.next()).done)&&(o.push(i.value),!e||o.length!==e);p=!0);}catch(a){r=!0,t=a}finally{try{p||null==n.return||n.return()}finally{if(r)throw t}}return o}}(a,e)||U(a,e)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function U(a,e){if(a){if("string"==typeof a)return W(a,e);var i=Object.prototype.toString.call(a).slice(8,-1);if("Object"===i&&a.constructor&&(i=a.constructor.name),"Map"===i||"Set"===i)return Array.from(a);if("Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i))return W(a,e)}}function W(a,e){(null==e||e>a.length)&&(e=a.length);for(var i=0,t=Array(e);i<e;i++)t[i]=a[i];return t}function H(a,e){var i=Object.keys(a);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(a);e&&(t=t.filter(function(e){return Object.getOwnPropertyDescriptor(a,e).enumerable})),i.push.apply(i,t)}return i}function $(a){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?H(Object(i),!0).forEach(function(e){Y(a,e,i[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(i)):H(Object(i)).forEach(function(e){Object.defineProperty(a,e,Object.getOwnPropertyDescriptor(i,e))})}return a}function Y(a,e,i){return e in a?Object.defineProperty(a,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):a[e]=i,a}function V(a,e){if(null==a)return{};var i,t,n=function(a,e){if(null==a)return{};var i,t,n={},o=Object.keys(a);for(t=0;t<o.length;t++)i=o[t],e.indexOf(i)>=0||(n[i]=a[i]);return n}(a,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(a);for(t=0;t<o.length;t++)i=o[t],!(e.indexOf(i)>=0)&&Object.prototype.propertyIsEnumerable.call(a,i)&&(n[i]=a[i])}return n}var J=(0,t.forwardRef)(function(a,e){var i=a.children,n=aa(V(a,M)),o=n.open,p=V(n,L);return(0,t.useImperativeHandle)(e,function(){return{open:o}},[o]),t.default.createElement(t.Fragment,null,i($($({},p),{},{open:o})))});J.displayName="Dropzone";var X={disabled:!1,getFilesFromEvent:function(a){return o(this,void 0,void 0,function*(){var e;if(s(a)&&s(a.dataTransfer))return function(a,e){return o(this,void 0,void 0,function*(){if(a.items){let i=m(a.items).filter(a=>"file"===a.kind);return"drop"!==e?i:d(function a(e){return e.reduce((e,i)=>[...e,...Array.isArray(i)?a(i):[i]],[])}((yield Promise.all(i.map(u)))))}return d(m(a.files).map(a=>r(a)))})}(a.dataTransfer,a.type);if(s(e=a)&&s(e.target))return m(a.target.files).map(a=>r(a));return Array.isArray(a)&&a.every(a=>"getFile"in a&&"function"==typeof a.getFile)?function(a){return o(this,void 0,void 0,function*(){return(yield Promise.all(a.map(a=>a.getFile()))).map(a=>r(a))})}(a):[]})},maxSize:1/0,minSize:0,multiple:!0,maxFiles:0,preventDropOnDocument:!0,noClick:!1,noKeyboard:!1,noDrag:!1,noDragEventsBubbling:!1,validator:null,useFsAccessApi:!1,autoFocus:!1};J.defaultProps=X,J.propTypes={children:n.default.func,accept:n.default.objectOf(n.default.arrayOf(n.default.string)),multiple:n.default.bool,preventDropOnDocument:n.default.bool,noClick:n.default.bool,noKeyboard:n.default.bool,noDrag:n.default.bool,noDragEventsBubbling:n.default.bool,minSize:n.default.number,maxSize:n.default.number,maxFiles:n.default.number,disabled:n.default.bool,getFilesFromEvent:n.default.func,onFileDialogCancel:n.default.func,onFileDialogOpen:n.default.func,useFsAccessApi:n.default.bool,autoFocus:n.default.bool,onDragEnter:n.default.func,onDragLeave:n.default.func,onDragOver:n.default.func,onDrop:n.default.func,onDropAccepted:n.default.func,onDropRejected:n.default.func,onError:n.default.func,validator:n.default.func};var Z={isFocused:!1,isFileDialogActive:!1,isDragActive:!1,isDragAccept:!1,isDragReject:!1,isDragGlobal:!1,acceptedFiles:[],fileRejections:[]};function aa(){var a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=$($({},X),a),i=e.accept,n=e.disabled,o=e.getFilesFromEvent,p=e.maxSize,r=e.minSize,l=e.multiple,c=e.maxFiles,s=e.onDragEnter,d=e.onDragLeave,m=e.onDragOver,u=e.onDrop,v=e.onDropAccepted,x=e.onDropRejected,f=e.onFileDialogCancel,g=e.onFileDialogOpen,h=e.useFsAccessApi,j=e.autoFocus,z=e.preventDropOnDocument,D=e.noClick,q=e.noKeyboard,E=e.noDrag,C=e.noDragEventsBubbling,M=e.onError,L=e.validator,U=(0,t.useMemo)(function(){return F(i)?Object.entries(i).reduce(function(a,e){var i=w(e,2),t=i[0],n=i[1];return[].concat(b(a),[t],b(n))},[]).filter(function(a){return Q(a)||N(a)}).join(","):void 0},[i]),W=(0,t.useMemo)(function(){return F(i)?[{description:"Files",accept:Object.entries(i).filter(function(a){var e=w(a,2),i=e[0],t=e[1],n=!0;return Q(i)||(console.warn('Skipped "'.concat(i,'" because it is not a valid MIME type. Check https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types for a list of valid MIME types.')),n=!1),Array.isArray(t)&&t.every(N)||(console.warn('Skipped "'.concat(i,'" because an invalid file extension was provided.')),n=!1),n}).reduce(function(a,e){var i=w(e,2),t=i[0],n=i[1];return y(y({},a),{},k({},t,n))},{})}]:i},[i]),H=(0,t.useMemo)(function(){return"function"==typeof g?g:ai},[g]),J=(0,t.useMemo)(function(){return"function"==typeof f?f:ai},[f]),aa=(0,t.useRef)(null),at=(0,t.useRef)(null),an=G((0,t.useReducer)(ae,Z),2),ao=an[0],ap=an[1],ar=ao.isFocused,al=ao.isFileDialogActive,ac=(0,t.useRef)("u">typeof window&&window.isSecureContext&&h&&"showOpenFilePicker"in window),as=function(){!ac.current&&al&&setTimeout(function(){at.current&&(at.current.files.length||(ap({type:"closeDialog"}),J()))},300)};(0,t.useEffect)(function(){return window.addEventListener("focus",as,!1),function(){window.removeEventListener("focus",as,!1)}},[at,al,J,ac]);var ad=(0,t.useRef)([]),am=(0,t.useRef)([]),au=function(a){aa.current&&aa.current.contains(a.target)||(a.preventDefault(),ad.current=[])};(0,t.useEffect)(function(){return z&&(document.addEventListener("dragover",R,!1),document.addEventListener("drop",au,!1)),function(){z&&(document.removeEventListener("dragover",R),document.removeEventListener("drop",au))}},[aa,z]),(0,t.useEffect)(function(){var a=function(a){am.current=[].concat(K(am.current),[a.target]),A(a)&&ap({isDragGlobal:!0,type:"setDragGlobal"})},e=function(a){am.current=am.current.filter(function(e){return e!==a.target&&null!==e}),am.current.length>0||ap({isDragGlobal:!1,type:"setDragGlobal"})},i=function(){am.current=[],ap({isDragGlobal:!1,type:"setDragGlobal"})},t=function(){am.current=[],ap({isDragGlobal:!1,type:"setDragGlobal"})};return document.addEventListener("dragenter",a,!1),document.addEventListener("dragleave",e,!1),document.addEventListener("dragend",i,!1),document.addEventListener("drop",t,!1),function(){document.removeEventListener("dragenter",a),document.removeEventListener("dragleave",e),document.removeEventListener("dragend",i),document.removeEventListener("drop",t)}},[aa]),(0,t.useEffect)(function(){return!n&&j&&aa.current&&aa.current.focus(),function(){}},[aa,j,n]);var av=(0,t.useCallback)(function(a){M?M(a):console.error(a)},[M]),ax=(0,t.useCallback)(function(a){a.preventDefault(),a.persist(),aC(a),ad.current=[].concat(K(ad.current),[a.target]),A(a)&&Promise.resolve(o(a)).then(function(e){if(!S(a)||C){var i,t,n,o,d,m,u,v,x=e.length,f=x>0&&(t=(i={files:e,accept:U,minSize:r,maxSize:p,multiple:l,maxFiles:c,validator:L}).files,n=i.accept,o=i.minSize,d=i.maxSize,m=i.multiple,u=i.maxFiles,v=i.validator,(!!m||!(t.length>1))&&(!m||!(u>=1)||!(t.length>u))&&t.every(function(a){var e=w(P(a,n),1)[0],i=w(T(a,o,d),1)[0],t=v?v(a):null;return e&&i&&!t}));ap({isDragAccept:f,isDragReject:x>0&&!f,isDragActive:!0,type:"setDraggedFiles"}),s&&s(a)}}).catch(function(a){return av(a)})},[o,s,av,C,U,r,p,l,c,L]),af=(0,t.useCallback)(function(a){a.preventDefault(),a.persist(),aC(a);var e=A(a);if(e&&a.dataTransfer)try{a.dataTransfer.dropEffect="copy"}catch(a){}return e&&m&&m(a),!1},[m,C]),ag=(0,t.useCallback)(function(a){a.preventDefault(),a.persist(),aC(a);var e=ad.current.filter(function(a){return aa.current&&aa.current.contains(a)}),i=e.indexOf(a.target);-1!==i&&e.splice(i,1),ad.current=e,!(e.length>0)&&(ap({type:"setDraggedFiles",isDragActive:!1,isDragAccept:!1,isDragReject:!1}),A(a)&&d&&d(a))},[aa,d,C]),ab=(0,t.useCallback)(function(a,e){var i=[],t=[];a.forEach(function(a){var e=G(P(a,U),2),n=e[0],o=e[1],l=G(T(a,r,p),2),c=l[0],s=l[1],d=L?L(a):null;if(n&&c&&!d)i.push(a);else{var m=[o,s];d&&(m=m.concat(d)),t.push({file:a,errors:m.filter(function(a){return a})})}}),(!l&&i.length>1||l&&c>=1&&i.length>c)&&(i.forEach(function(a){t.push({file:a,errors:[O]})}),i.splice(0)),ap({acceptedFiles:i,fileRejections:t,type:"setFiles"}),u&&u(i,t,e),t.length>0&&x&&x(t,e),i.length>0&&v&&v(i,e)},[ap,l,U,r,p,c,u,v,x,L]),ah=(0,t.useCallback)(function(a){a.preventDefault(),a.persist(),aC(a),ad.current=[],A(a)&&Promise.resolve(o(a)).then(function(e){(!S(a)||C)&&ab(e,a)}).catch(function(a){return av(a)}),ap({type:"reset"})},[o,ab,av,C]),ay=(0,t.useCallback)(function(){if(ac.current){ap({type:"openDialog"}),H(),window.showOpenFilePicker({multiple:l,types:W}).then(function(a){return o(a)}).then(function(a){ab(a,null),ap({type:"closeDialog"})}).catch(function(a){a instanceof DOMException&&("AbortError"===a.name||a.code===a.ABORT_ERR)?(J(a),ap({type:"closeDialog"})):a instanceof DOMException&&("SecurityError"===a.name||a.code===a.SECURITY_ERR)?(ac.current=!1,at.current?(at.current.value=null,at.current.click()):av(Error("Cannot open the file picker because the https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API is not supported and no <input> was provided."))):av(a)});return}at.current&&(ap({type:"openDialog"}),H(),at.current.value=null,at.current.click())},[ap,H,J,h,ab,av,W,l]),ak=(0,t.useCallback)(function(a){aa.current&&aa.current.isEqualNode(a.target)&&(" "===a.key||"Enter"===a.key||32===a.keyCode||13===a.keyCode)&&(a.preventDefault(),ay())},[aa,ay]),aw=(0,t.useCallback)(function(){ap({type:"focus"})},[]),aj=(0,t.useCallback)(function(){ap({type:"blur"})},[]),az=(0,t.useCallback)(function(){D||(function(){var a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:window.navigator.userAgent;return -1!==a.indexOf("MSIE")||-1!==a.indexOf("Trident/")||-1!==a.indexOf("Edge/")}()?setTimeout(ay,0):ay())},[D,ay]),aD=function(a){return n?null:a},aq=function(a){return q?null:aD(a)},aE=function(a){return E?null:aD(a)},aC=function(a){C&&a.stopPropagation()},aO=(0,t.useMemo)(function(){return function(){var a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=a.refKey,i=a.role,t=a.onKeyDown,o=a.onFocus,p=a.onBlur,r=a.onClick,l=a.onDragEnter,c=a.onDragOver,s=a.onDragLeave,d=a.onDrop,m=V(a,B);return $($(Y({onKeyDown:aq(I(t,ak)),onFocus:aq(I(o,aw)),onBlur:aq(I(p,aj)),onClick:aD(I(r,az)),onDragEnter:aE(I(l,ax)),onDragOver:aE(I(c,af)),onDragLeave:aE(I(s,ag)),onDrop:aE(I(d,ah)),role:"string"==typeof i&&""!==i?i:"presentation"},void 0===e?"ref":e,aa),n||q?{}:{tabIndex:0}),m)}},[aa,ak,aw,aj,az,ax,af,ag,ah,q,E,n]),aP=(0,t.useCallback)(function(a){a.stopPropagation()},[]),aT=(0,t.useMemo)(function(){return function(){var a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=a.refKey,i=a.onChange,t=a.onClick,n=V(a,_);return $($({},Y({accept:U,multiple:l,type:"file",style:{border:0,clip:"rect(0, 0, 0, 0)",clipPath:"inset(50%)",height:"1px",margin:"0 -1px -1px 0",overflow:"hidden",padding:0,position:"absolute",width:"1px",whiteSpace:"nowrap"},onChange:aD(I(i,ah)),onClick:aD(I(t,aP)),tabIndex:-1},void 0===e?"ref":e,at)),n)}},[at,i,l,ah,n]);return $($({},ao),{},{isFocused:ar&&!n,getRootProps:aO,getInputProps:aT,rootRef:aa,inputRef:at,open:aD(ay)})}function ae(a,e){switch(e.type){case"focus":return $($({},a),{},{isFocused:!0});case"blur":return $($({},a),{},{isFocused:!1});case"openDialog":return $($({},Z),{},{isFileDialogActive:!0});case"closeDialog":return $($({},a),{},{isFileDialogActive:!1});case"setDraggedFiles":return $($({},a),{},{isDragActive:e.isDragActive,isDragAccept:e.isDragAccept,isDragReject:e.isDragReject});case"setFiles":return $($({},a),{},{acceptedFiles:e.acceptedFiles,fileRejections:e.fileRejections,isDragReject:!1});case"setDragGlobal":return $($({},a),{},{isDragGlobal:e.isDragGlobal});case"reset":return $({},Z);default:return a}}function ai(){}var at=a.i(10817),an=a.i(6927);let ao=(0,an.default)("upload",[["path",{d:"M12 3v12",key:"1x0j5s"}],["path",{d:"m17 8-5-5-5 5",key:"7q97r8"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}]]),ap=(0,an.default)("clipboard-paste",[["path",{d:"M11 14h10",key:"1w8e9d"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v1.344",key:"1e62lh"}],["path",{d:"m17 18 4-4-4-4",key:"z2g111"}],["path",{d:"M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 1.793-1.113",key:"bjbb7m"}],["rect",{x:"8",y:"2",width:"8",height:"4",rx:"1",key:"ublpy"}]]),ar=(0,an.default)("arrow-right",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]);var al=a.i(59282),ac=a.i(41146),as=a.i(50363),ad=a.i(6343),am=a.i(47163),au=a.i(86751);function av({className:a}){return(0,e.jsxs)("div",{"aria-hidden":"true",className:a,style:{position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none",zIndex:0},children:[(0,e.jsx)("div",{style:{position:"absolute",inset:0,background:`
            radial-gradient(ellipse 70% 55% at 50% 45%,
              rgba(37,99,235,0.18) 0%,
              rgba(59,130,246,0.10) 35%,
              transparent 70%
            )
          `}}),(0,e.jsx)("div",{style:{position:"absolute",inset:0,background:`
            radial-gradient(ellipse 40% 32% at 50% 42%,
              rgba(96,165,250,0.22) 0%,
              rgba(59,130,246,0.12) 40%,
              transparent 75%
            )
          `}}),(0,e.jsx)("div",{style:{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle, rgba(96,165,250,0.55) 1px, transparent 1px)",backgroundSize:"28px 28px",backgroundPosition:"center center",WebkitMaskImage:"radial-gradient(ellipse 72% 58% at 50% 44%, black 0%, black 30%, transparent 68%)",maskImage:"radial-gradient(ellipse 72% 58% at 50% 44%, black 0%, black 30%, transparent 68%)"}}),(0,e.jsx)("div",{style:{position:"absolute",inset:0,background:`
            radial-gradient(ellipse 18% 14% at 50% 40%,
              rgba(147,197,253,0.28) 0%,
              transparent 100%
            )
          `}})]})}var ax=a.i(20812);function af({onLoad:a,onLoadMock:i}){let[n,o]=(0,t.useState)("drop"),[p,r]=(0,t.useState)(""),[l,c]=(0,t.useState)(!1),[s,d]=(0,t.useState)(!1),{getRootProps:m,getInputProps:u,isDragActive:v}=aa({onDrop:(0,t.useCallback)(e=>{let i=e[0];if(!i)return;let t=new FileReader;t.onload=e=>{a(e.target?.result)},t.readAsText(i)},[a]),accept:{"text/markdown":[".md",".markdown"],"text/plain":[".txt"]},multiple:!1,onDragEnter:()=>c(!0),onDragLeave:()=>c(!1),onDropAccepted:()=>c(!1),onDropRejected:()=>c(!1)});return(0,e.jsxs)("div",{className:"min-h-screen flex flex-col bg-background",children:[(0,e.jsx)(ax.ExportSource,{open:s,onClose:()=>d(!1)}),(0,e.jsxs)("header",{className:"border-b border-border px-6 py-3 flex items-center gap-3",children:[(0,e.jsxs)("div",{className:"flex items-center gap-2",children:[(0,e.jsx)("div",{className:"w-6 h-6 rounded bg-primary/20 border border-primary/30 flex items-center justify-center",children:(0,e.jsx)(al.BookOpen,{size:13,className:"text-primary"})}),(0,e.jsx)("span",{className:"font-semibold text-sm text-foreground",children:"README Visualizer"})]}),(0,e.jsxs)("div",{className:"ml-auto flex items-center gap-2 text-xs text-muted-foreground",children:[(0,e.jsxs)("span",{className:"flex items-center gap-1 px-2 py-1 rounded bg-muted/50 border border-border",children:[(0,e.jsx)(ac.Code2,{size:11})," No auth required"]}),(0,e.jsxs)("span",{className:"flex items-center gap-1 px-2 py-1 rounded bg-muted/50 border border-border",children:[(0,e.jsx)(ad.GitBranch,{size:11})," Local only"]}),(0,e.jsx)(au.ThemeToggle,{}),(0,e.jsxs)("button",{onClick:()=>d(!0),className:"flex items-center gap-1.5 px-2 py-1 rounded bg-muted/50 border border-border text-xs text-muted-foreground hover:text-foreground transition-colors","aria-label":"Open source & self-hosting",children:[(0,e.jsx)(ad.GitBranch,{size:11})," Source"]})]})]}),(0,e.jsxs)("main",{className:"relative flex-1 flex flex-col items-center justify-center px-6 py-16",children:[(0,e.jsx)(av,{}),(0,e.jsxs)("div",{className:"relative z-10 w-full max-w-2xl space-y-8",children:[(0,e.jsxs)("div",{className:"text-center space-y-3",children:[(0,e.jsxs)("div",{className:"inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-2",children:[(0,e.jsx)(as.Hash,{size:11}),(0,e.jsx)("span",{children:"Markdown Dashboard"})]}),(0,e.jsx)("h1",{className:"text-4xl font-bold text-foreground tracking-tight text-balance",children:"Visualize your README"}),(0,e.jsx)("p",{className:"text-muted-foreground text-base leading-relaxed text-balance max-w-md mx-auto",children:"Transform large README.md files into an interactive dashboard with search, navigation, and statistics."})]}),(0,e.jsxs)("div",{className:"rounded-xl border border-border bg-card overflow-hidden shadow-lg shadow-gray-200/80",children:[(0,e.jsx)("div",{className:"flex border-b border-border",children:["drop","paste"].map(a=>(0,e.jsxs)("button",{onClick:()=>o(a),className:(0,am.cn)("flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors",n===a?"text-foreground border-b-2 border-primary bg-muted/20":"text-muted-foreground hover:text-foreground hover:bg-muted/10"),children:["drop"===a?(0,e.jsx)(ao,{size:14}):(0,e.jsx)(ap,{size:14}),"drop"===a?"Upload File":"Paste Markdown"]},a))}),(0,e.jsx)("div",{className:"p-6",children:"drop"===n?(0,e.jsxs)("div",{...m(),className:(0,am.cn)("border-2 border-dashed rounded-lg p-10 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all duration-200",v||l?"border-primary bg-primary/5 scale-[1.01]":"border-border hover:border-border/80 hover:bg-muted/20"),children:[(0,e.jsx)("input",{...u()}),(0,e.jsx)("div",{className:(0,am.cn)("w-14 h-14 rounded-xl flex items-center justify-center border transition-colors",v?"bg-primary/15 border-primary/40":"bg-muted border-border"),children:(0,e.jsx)(at.FileText,{size:24,className:v?"text-primary":"text-muted-foreground"})}),(0,e.jsxs)("div",{className:"text-center",children:[(0,e.jsx)("p",{className:"font-medium text-sm text-foreground",children:v?"Drop your README here":"Drag & drop your README.md"}),(0,e.jsx)("p",{className:"text-xs text-muted-foreground mt-1",children:"or click to browse — .md, .markdown, .txt"})]})]}):(0,e.jsxs)("div",{className:"space-y-3",children:[(0,e.jsx)("textarea",{value:p,onChange:a=>r(a.target.value),placeholder:"# My Project  Paste your README markdown here...",className:"w-full h-44 rounded-lg border border-border bg-muted/20 px-4 py-3 text-sm font-mono text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 resize-none transition-colors"}),(0,e.jsxs)("button",{onClick:()=>{p.trim()&&a(p)},disabled:!p.trim(),className:(0,am.cn)("w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all",p.trim()?"bg-primary text-primary-foreground hover:bg-primary/90":"bg-muted text-muted-foreground cursor-not-allowed"),children:[(0,e.jsx)(ar,{size:14}),"Visualize Markdown"]})]})})]}),(0,e.jsx)("div",{className:"text-center",children:(0,e.jsxs)("button",{onClick:i,className:"inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group",children:[(0,e.jsx)(al.BookOpen,{size:14,className:"text-primary"}),(0,e.jsx)("span",{children:"Load demo README"}),(0,e.jsx)(ar,{size:12,className:"group-hover:translate-x-0.5 transition-transform"})]})}),(0,e.jsx)("div",{className:"grid grid-cols-3 gap-3 pt-2",children:[{icon:(0,e.jsx)(as.Hash,{size:14}),title:"Section Tree",desc:"Navigate sections with collapsible tree"},{icon:(0,e.jsx)(ac.Code2,{size:14}),title:"Code Snippets",desc:"Extracted blocks with copy support"},{icon:(0,e.jsx)(at.FileText,{size:14}),title:"Statistics",desc:"Word count, headings, links, and more"}].map(a=>(0,e.jsxs)("div",{className:"p-3.5 rounded-lg bg-card border border-border text-center space-y-1.5",children:[(0,e.jsx)("div",{className:"inline-flex p-2 rounded-md bg-muted text-primary",children:a.icon}),(0,e.jsx)("div",{className:"text-xs font-semibold text-foreground",children:a.title}),(0,e.jsx)("div",{className:"text-xs text-muted-foreground leading-relaxed",children:a.desc})]},a.title))})]})]})]})}let ag=`# React Query - Powerful Asynchronous State Management

[![npm version](https://badge.fury.io/js/%40tanstack%2Fquery-core.svg)](https://badge.fury.io/js/%40tanstack%2Fquery-core)
[![Build Status](https://github.com/TanStack/query/workflows/react-query/badge.svg)](https://github.com/TanStack/query/actions?query=workflow%3Areact-query)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> Fetching, caching, synchronizing and updating server state in your React applications made easy.

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
  - [npm / Yarn / pnpm](#npm--yarn--pnpm)
  - [CDN](#cdn)
- [Quick Start](#quick-start)
- [Features](#features)
- [Usage](#usage)
  - [Queries](#queries)
  - [Mutations](#mutations)
  - [Query Invalidation](#query-invalidation)
- [Configuration](#configuration)
  - [QueryClient](#queryclient)
  - [Global Defaults](#global-defaults)
- [API Reference](#api-reference)
  - [useQuery](#usequery)
  - [useMutation](#usemutation)
  - [useQueryClient](#usequeryclient)
- [Advanced Patterns](#advanced-patterns)
  - [Dependent Queries](#dependent-queries)
  - [Parallel Queries](#parallel-queries)
  - [Infinite Queries](#infinite-queries)
- [TypeScript](#typescript)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Introduction

React Query is often described as the missing data-fetching library for React, but in more technical terms, it makes **fetching, caching, synchronizing and updating server state** in your React applications a breeze.

Out of the box, React Query requires **zero-configuration** and can be customized to your liking as your application grows.

React Query provides:

- Window focus refetching
- Request deduplication
- Automatic garbage collection
- Mutations + Query Invalidation
- Infinite scroll queries
- Optimistic updates
- Offline support

## Installation

### npm / Yarn / pnpm

Install React Query via your preferred package manager:

\`\`\`bash
# npm
npm install @tanstack/react-query

# Yarn
yarn add @tanstack/react-query

# pnpm
pnpm add @tanstack/react-query
\`\`\`

### CDN

You can also use React Query via CDN for rapid prototyping:

\`\`\`html
<script src="https://unpkg.com/@tanstack/react-query@5/build/umd/index.production.js"></script>
\`\`\`

#### DevTools

Install the optional devtools package for debugging:

\`\`\`bash
npm install @tanstack/react-query-devtools
\`\`\`

##### Windows

On Windows, ensure you have Node.js 18+ installed. You can verify with:

\`\`\`powershell
node --version
npm --version
\`\`\`

##### Linux

On Linux, you may need to set file permissions for global npm installs:

\`\`\`bash
sudo chown -R $(whoami) ~/.npm
npm install -g @tanstack/react-query
\`\`\`

## Quick Start

Wrap your application in a \`QueryClientProvider\` and start querying:

\`\`\`tsx
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Todos />
    </QueryClientProvider>
  )
}

function Todos() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn: () => fetch('/api/todos').then(res => res.json()),
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <ul>
      {data.map(todo => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  )
}
\`\`\`

## Features

| Feature | Description |
|---------|-------------|
| **Auto Caching** | Responses are automatically cached and reused |
| **Background Refetch** | Stale data is automatically refreshed in the background |
| **Deduplication** | Duplicate requests are deduplicated automatically |
| **Pagination** | Built-in support for paginated and infinite data |
| **Optimistic Updates** | Update UI before server confirmation |
| **Offline Support** | Retry queries when coming back online |

## Usage

### Queries

Basic query usage with automatic caching:

\`\`\`typescript
const { data, isLoading, isError, error } = useQuery({
  queryKey: ['users', userId],
  queryFn: async () => {
    const response = await fetch(\`/api/users/\${userId}\`)
    if (!response.ok) throw new Error('Network response was not ok')
    return response.json()
  },
  staleTime: 5 * 60 * 1000, // 5 minutes
  gcTime: 10 * 60 * 1000,   // 10 minutes
})
\`\`\`

### Mutations

Use mutations to create, update, or delete server data:

\`\`\`typescript
const mutation = useMutation({
  mutationFn: (newTodo: { title: string }) =>
    fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify(newTodo),
    }).then(res => res.json()),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['todos'] })
  },
  onError: (error) => {
    console.error('Failed to create todo:', error)
  },
})

// Usage
mutation.mutate({ title: 'Buy groceries' })
\`\`\`

### Query Invalidation

Invalidate and refetch queries after mutations:

\`\`\`typescript
import { useQueryClient } from '@tanstack/react-query'

function TodoForm() {
  const queryClient = useQueryClient()

  const handleSubmit = async (data) => {
    await createTodo(data)
    // Invalidate and refetch
    await queryClient.invalidateQueries({ queryKey: ['todos'] })
  }
}
\`\`\`

## Configuration

### QueryClient

Configure the QueryClient with global defaults:

\`\`\`typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      retry: 3,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
})
\`\`\`

### Global Defaults

You can also set defaults for specific query keys:

\`\`\`typescript
queryClient.setQueryDefaults(['todos'], {
  staleTime: 5 * 60 * 1000,
  gcTime: 30 * 60 * 1000,
})
\`\`\`

## API Reference

### useQuery

\`\`\`typescript
const result = useQuery({
  queryKey: QueryKey,
  queryFn: QueryFunction,
  enabled?: boolean,
  staleTime?: number,
  gcTime?: number,
  refetchInterval?: number | false,
  retry?: boolean | number,
  select?: (data: TData) => TSelectedData,
  placeholderData?: TData | (previousData: TData) => TData,
})
\`\`\`

**Returns:**

- \`data\` — The resolved query data
- \`isLoading\` — True if no data and fetching
- \`isFetching\` — True if fetching in background  
- \`isError\` — True if the query errored
- \`error\` — The error object if \`isError\` is true
- \`refetch\` — Function to manually trigger refetch

### useMutation

\`\`\`typescript
const mutation = useMutation({
  mutationFn: MutationFunction,
  onSuccess?: (data, variables, context) => void,
  onError?: (error, variables, context) => void,
  onSettled?: (data, error, variables, context) => void,
  onMutate?: (variables) => Promise<context> | context,
})
\`\`\`

### useQueryClient

\`\`\`typescript
const queryClient = useQueryClient()

// Invalidate queries
queryClient.invalidateQueries({ queryKey: ['todos'] })

// Set data manually
queryClient.setQueryData(['todos'], newData)

// Get cached data
const data = queryClient.getQueryData(['todos'])
\`\`\`

## Advanced Patterns

### Dependent Queries

Chain queries that depend on previous results:

\`\`\`typescript
const { data: user } = useQuery({
  queryKey: ['user', userId],
  queryFn: () => fetchUser(userId),
})

const { data: projects } = useQuery({
  queryKey: ['projects', user?.id],
  queryFn: () => fetchProjects(user!.id),
  enabled: !!user?.id, // Only runs after user is loaded
})
\`\`\`

### Parallel Queries

Run multiple queries in parallel:

\`\`\`typescript
function App({ users }) {
  const userQueries = useQueries({
    queries: users.map((user) => ({
      queryKey: ['user', user.id],
      queryFn: () => fetchUserById(user.id),
    })),
  })
}
\`\`\`

### Infinite Queries

Implement infinite scroll with \`useInfiniteQuery\`:

\`\`\`typescript
const {
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
} = useInfiniteQuery({
  queryKey: ['projects'],
  queryFn: ({ pageParam }) => fetchProjects(pageParam),
  initialPageParam: 0,
  getNextPageParam: (lastPage) => lastPage.nextCursor,
})
\`\`\`

## TypeScript

React Query is written in TypeScript and provides full type safety:

\`\`\`typescript
interface Todo {
  id: number
  title: string
  completed: boolean
}

const { data } = useQuery<Todo[], Error>({
  queryKey: ['todos'],
  queryFn: (): Promise<Todo[]> => fetch('/api/todos').then(r => r.json()),
})
// data is typed as Todo[] | undefined
\`\`\`

## Testing

Set up React Query in your tests:

\`\`\`typescript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  })
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

test('loads and displays todos', async () => {
  const { findByText } = render(<Todos />, { wrapper: createWrapper() })
  await findByText('Todo 1')
})
\`\`\`

## Contributing

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) before submitting a PR.

1. Fork the repository
2. Create a feature branch: \`git checkout -b feature/amazing-feature\`
3. Commit your changes: \`git commit -m 'Add amazing feature'\`
4. Push to the branch: \`git push origin feature/amazing-feature\`
5. Open a Pull Request

## License

MIT \xa9 [Tanner Linsley](https://github.com/tannerlinsley)

See [LICENSE](LICENSE) for more information.
`;a.s(["default",0,function(){let a=(0,i.useRouter)(),t=(e,i)=>{sessionStorage.setItem("readme-visualizer:content",e),sessionStorage.setItem("readme-visualizer:filename",i),a.push("/viewer")};return(0,e.jsx)(af,{onLoad:a=>{t(a,"README.md")},onLoadMock:()=>{t(ag,"react-query-README.md")}})}],31713)}]);