var {
    UniverCore,
    UniverDesign,
    UniverEngineRender,
    UniverEngineFormula,
    UniverDocs,
    UniverDocsUi,
    UniverUi,
    UniverSheets,
    UniverSheetsUi,
    UniverSheetsNumfmt,
    UniverSheetsFormula,
    UniverFacade,
  } = window

  var univer = new UniverCore.Univer({
    theme: UniverDesign.defaultTheme,
    locale: UniverCore.LocaleType.ZH_CN,
    locales: {
      [UniverCore.LocaleType.ZH_CN]: UniverUMD['zh-CN'],
    },
  });

  univer.registerPlugin(UniverEngineRender.UniverRenderEnginePlugin);
  univer.registerPlugin(UniverEngineFormula.UniverFormulaEnginePlugin);

  univer.registerPlugin(UniverUi.UniverUIPlugin, {
    container: "app",
  });

  univer.registerPlugin(UniverDocs.UniverDocsPlugin, {
    hasScroll: false,
  });
  univer.registerPlugin(UniverDocsUi.UniverDocsUIPlugin);

  univer.registerPlugin(UniverSheets.UniverSheetsPlugin);
  univer.registerPlugin(UniverSheetsUi.UniverSheetsUIPlugin);
  univer.registerPlugin(UniverSheetsNumfmt.UniverSheetsNumfmtPlugin);
  univer.registerPlugin(UniverSheetsFormula.UniverSheetsFormulaPlugin);

  univer.createUnit(UniverCore.UniverInstanceType.UNIVER_SHEET, {})

  const univerAPI = UniverFacade.FUniver.newAPI(univer)
 