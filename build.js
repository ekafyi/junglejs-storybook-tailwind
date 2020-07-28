const express = require('express');

const { startGraphqlServer, stopGraphqlServer, readRoutes } = require('junglejs');

const getJungleConfig = require("./jungle.config");

const app = express();

getJungleConfig().then((jungleConfig) => {
	startGraphqlServer(jungleConfig, __dirname, () => readRoutes(jungleConfig, app, __dirname).then(() => stopGraphqlServer(() => null)));
});