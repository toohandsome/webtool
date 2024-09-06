// https://docs.excalidraw.com/docs

const elements = ExcalidrawLib.convertToExcalidrawElements([
  {
    type: "diamond",
    x: -120,
    y: 100,
    width: 270,
    backgroundColor: "#fff3bf",
    strokeWidth: 2,
    label: {
      text: "STYLED DIAMOND TEXT CONTAINER",
      strokeColor: "#099268",
      fontSize: 20,
    },
  },
  {
    type: "rectangle",
    x: 180,
    y: 150,
    width: 200,
    strokeColor: "#c2255c",
    label: {
      text: "TOP LEFT ALIGNED RECTANGLE TEXT CONTAINER",
      textAlign: "left",
      verticalAlign: "top",
      fontSize: 20,
    },
  },
  {
    type: "ellipse",
    x: 400,
    y: 130,
    strokeColor: "#f08c00",
    backgroundColor: "#ffec99",
    width: 200,
    label: {
      text: "STYLED ELLIPSE TEXT CONTAINER",
      strokeColor: "#c2255c",
    },
  },
  {
    type: "ellipse",
    id: "ellipse-1",
    strokeColor: "#66a80f",
    x: 390,
    y: 356,
    width: 150,
    height: 150,
    backgroundColor: "#d8f5a2",
  },
  {
    type: "diamond",
    id: "diamond-1",
    strokeColor: "#9c36b5",
    width: 100,
    x: -30,
    y: 380,
  },
  {
    type: "arrow",
    x: 100,
    y: 440,
    width: 295,
    height: 35,
    strokeColor: "#1864ab",
    start: {
      type: "rectangle",
      width: 150,
      height: 150,
    },
    end: {
      id: "ellipse-1",
    },
  },
  {
    type: "arrow",
    x: 60,
    y: 420,
    width: 330,
    strokeColor: "#e67700",
    start: {
      id: "diamond-1",
    },
    end: {
      id: "ellipse-1",
    },
  },
  {
    type: "rectangle",
    x: 60,
    y: 550,
    width: 200,
    height: 100,
    backgroundColor: "#c0eb75",
    strokeWidth: 2,
  },
  {
    type: "ellipse",
    x: 300,
    y: 550,
    width: 200,
    height: 100,
    backgroundColor: "#ffc9c9",
    strokeStyle: "dotted",
    fillStyle: "solid",
    strokeWidth: 2,
  },
  {
    type: "diamond",
    x: 550,
    y: 550,
    width: 200,
    height: 100,
    backgroundColor: "#a5d8ff",
    strokeColor: "#1971c2",
    strokeStyle: "dashed",
    fillStyle: "cross-hatch",
    strokeWidth: 2,
  },
]);
const options = {
  langCode: "zh-CN",
  autoFocus: true,
  initialData: {
    elements: elements,
    appState: {
      //  zenModeEnabled: true
    },
    scrollToContent: true,
  },
  gridModeEnabled: true, // Enable the grid by default
};

const DefaultItems = ExcalidrawLib.MainMenu.DefaultItems;

function t1() {
  console.log("xxx");
}

var excalidApp = () => {
  [excalidrawAPI, setExcalidrawAPI] = React.useState(null);

  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      "div",
      {
        style: { height: "calc(100vh - 71px)" },
      },
      React.createElement(
        ExcalidrawLib.Excalidraw,
        {
          ...options,
          excalidrawAPI: (api) => setExcalidrawAPI(api),
        },
        React.createElement(
          ExcalidrawLib.MainMenu,
          {
            onSelect: t1,
          },
          //
          React.createElement(ExcalidrawLib.MainMenu.DefaultItems.LoadScene, {
            onSelect: t1,
          }), 
          React.createElement(ExcalidrawLib.MainMenu.DefaultItems.Export, {
            onSelect: t1,
          }),  
          React.createElement(ExcalidrawLib.MainMenu.DefaultItems.SaveAsImage, {
            onSelect: t1,
          }), 
          // React.createElement(ExcalidrawLib.MainMenu.DefaultItems.LiveCollaborationTrigger, {
          //   onSelect: t1,
          // }), 
          React.createElement(ExcalidrawLib.MainMenu.DefaultItems.Help, {
            onSelect: t1,
          }),
          React.createElement(ExcalidrawLib.MainMenu.DefaultItems.ClearCanvas, {
            onSelect: t1,
          }) ,
          React.createElement(ExcalidrawLib.MainMenu.DefaultItems.SaveToActiveFile, {
            onSelect: t1,
          }) ,
          React.createElement(ExcalidrawLib.MainMenu.DefaultItems.ToggleTheme, {
            onSelect: t1,
          }) ,
          React.createElement(ExcalidrawLib.MainMenu.DefaultItems.ChangeCanvasBackground, {
            onSelect: t1,
          })
        ),
        React.createElement(
          ExcalidrawLib.WelcomeScreen 
        )
      )
    )
  );
};

var excalidrawWrapper = document.getElementById("excalidrawApp");
var root = ReactDOM.createRoot(excalidrawWrapper);

root.render(React.createElement(excalidApp));
