# WebApp for a Eclipse board game calculator

This is a web application for a board game calculator. The game is called [Eclipse](https://boardgamegeek.com/boardgame/72125/eclipse) and it is a 4X game (eXplore, eXpand, eXploit, eXterminate). The game is played on a hexagonal grid and the players have to manage their resources, research new technologies, build ships and conquer new territories.

For a given ship battle, this calculator gives the win chance, and the survival chance for each ship. The calculator doesn't use a Monte Carlo method to simulate the battle, but it uses advanced tools of decision theory known as [Bellman value function programming](https://en.wikipedia.org/wiki/Bellman_equation) to compute win chance.

The website is hosted on a [Flask server](https://github.com/EsauRoiDesBarbus/EclipseBoardgameServer) and you can access it [here](http://eclipseboardgamecalculator.duckdns.org/).

## How to install

To install the web application, you need to have [Node.js](https://nodejs.org/) installed on your computer. Then, you can install the dependencies with the following commands:

```bash
npm install
```

## How to run

To run the web application, you can use the following command:

```bash
npm run dev
```

This command will start a development server and open the web application in your default browser.

## How to build

To build the web application, you can use the following command:

```bash
npm run build
```

This command will create a `dist` folder with the web application ready to be deployed.

## Thanks to

- [React](https://reactjs.org/) for the web application framework
- [Vite](https://vitejs.dev/) for the web application bundler
- [React hook form](https://react-hook-form.com/) for the form management
- [D3.js](https://d3js.org/) for the data visualization
