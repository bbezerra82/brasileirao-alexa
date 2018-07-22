/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');

const SKILL_NAME = "Brasileirão";

const cb = require('campeonato-brasileiro-api');

const APP_ID = "amzn1.ask.skill.f0399e09-bfcc-44ba-9395-73d0b38be102";

const PAGINATION_SIZE = 5;

const table_off = [
  { "nome": "Flamengo", "pontos": "27", "jogos": "12", "vitorias": "8", "empates": "3", "derrotas": "1", "golsPro": "21", "golsContra": "7", "saldoGols": "14", "percentual": "75.0" },
  { "nome": "Atlético-MG", "pontos": "23", "jogos": "12", "vitorias": "7", "empates": "2", "derrotas": "3", "golsPro": "24", "golsContra": "17", "saldoGols": "7", "percentual": "63.9" },
  { "nome": "São Paulo", "pontos": "23", "jogos": "12", "vitorias": "6", "empates": "5", "derrotas": "1", "golsPro": "18", "golsContra": "11", "saldoGols": "7", "percentual": "63.9" },
  { "nome": "Internacional", "pontos": "22", "jogos": "12", "vitorias": "6", "empates": "4", "derrotas": "2", "golsPro": "15", "golsContra": "8", "saldoGols": "7", "percentual": "61.1" },
  { "nome": "Grêmio", "pontos": "20", "jogos": "12", "vitorias": "5", "empates": "5", "derrotas": "2", "golsPro": "11", "golsContra": "5", "saldoGols": "6", "percentual": "55.6" },
  { "nome": "Palmeiras", "pontos": "19", "jogos": "12", "vitorias": "5", "empates": "4", "derrotas": "3", "golsPro": "18", "golsContra": "11", "saldoGols": "7", "percentual": "52.8" },
  { "nome": "Sport", "pontos": "19", "jogos": "12", "vitorias": "5", "empates": "4", "derrotas": "3", "golsPro": "15", "golsContra": "15", "saldoGols": "0", "percentual": "52.8" },
  { "nome": "Cruzeiro", "pontos": "18", "jogos": "12", "vitorias": "5", "empates": "3", "derrotas": "4", "golsPro": "8", "golsContra": "7", "saldoGols": "1", "percentual": "50.0" },
  { "nome": "Botafogo", "pontos": "17", "jogos": "12", "vitorias": "4", "empates": "5", "derrotas": "3", "golsPro": "16", "golsContra": "14", "saldoGols": "2", "percentual": "47.2" },
  { "nome": "Corinthians", "pontos": "16", "jogos": "12", "vitorias": "4", "empates": "4", "derrotas": "4", "golsPro": "12", "golsContra": "9", "saldoGols": "3", "percentual": "44.4" },
  { "nome": "Vasco", "pontos": "15", "jogos": "11", "vitorias": "4", "empates": "3", "derrotas": "4", "golsPro": "17", "golsContra": "18", "saldoGols": "-1", "percentual": "45.5" },
  { "nome": "Fluminense", "pontos": "14", "jogos": "12", "vitorias": "4", "empates": "2", "derrotas": "6", "golsPro": "14", "golsContra": "17", "saldoGols": "-3", "percentual": "38.9" },
  { "nome": "América-MG", "pontos": "14", "jogos": "12", "vitorias": "4", "empates": "2", "derrotas": "6", "golsPro": "14", "golsContra": "18", "saldoGols": "-4", "percentual": "38.9" },
  { "nome": "Chapecoense", "pontos": "14", "jogos": "12", "vitorias": "3", "empates": "5", "derrotas": "4", "golsPro": "14", "golsContra": "19", "saldoGols": "-5", "percentual": "38.9" },
  { "nome": "Santos", "pontos": "13", "jogos": "11", "vitorias": "4", "empates": "1", "derrotas": "6", "golsPro": "14", "golsContra": "16", "saldoGols": "-2", "percentual": "39.4" },
  { "nome": "Vitória", "pontos": "12", "jogos": "12", "vitorias": "3", "empates": "3", "derrotas": "6", "golsPro": "16", "golsContra": "23", "saldoGols": "-7", "percentual": "33.3" },
  { "nome": "Bahia", "pontos": "12", "jogos": "12", "vitorias": "3", "empates": "3", "derrotas": "6", "golsPro": "10", "golsContra": "17", "saldoGols": "-7", "percentual": "33.3" },
  { "nome": "Paraná", "pontos": "10", "jogos": "12", "vitorias": "2", "empates": "4", "derrotas": "6", "golsPro": "7", "golsContra": "16", "saldoGols": "-9", "percentual": "27.8" },
  { "nome": "Atlético-PR", "pontos": "9", "jogos": "12", "vitorias": "2", "empates": "3", "derrotas": "7", "golsPro": "10", "golsContra": "15", "saldoGols": "-5", "percentual": "25.0" },
  { "nome": "Ceará", "pontos": "5", "jogos": "12", "vitorias": "0", "derrotas": "7", "golsPro": "7", "golsContra": "18", "saldoGols": "-11", "percentual": "13.9" }
];

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  async handle(handlerInput) {
    console.log("[INFO]: " + handlerInput.requestEnvelope.request.type);
    const speechText = "";
    // First use:
    speechText = "Hello and welcome to " + SKILL_NAME + ". I noticed it is your first time using this skill. " +
      "What is your name?";
    // Return visit:
    speechText = "Welcome back " + USER_NAME + "! " + TEAM_NAME + " is currently <say-as interpret-as=\"ordinal>" +
      TEAM_POSITION + "</say-as> with " + POINTS + ". " + ROUNDS + " matches have been played."

    await standings(handlerInput);

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withShouldEndSession(false)
      .withSimpleCard(SKILL_NAME, speechText)
      .getResponse();
  },
};

// TODO: work out the logic and speech
const FirstPlaceIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'firstPlaceIntent';
  },
  async handle(handlerInput) {
    console.log("[INFO]: " + handlerInput.requestEnvelope.request.intent.name);
    var position = 1;
    var speechText = "";
    const attributes = handlerInput.attributesManager.getSessionAttributes();

    // await standings(handlerInput);

    var firstPlace = JSON.stringify(table_off[0].nome,null,4).slice(1, -1);
    var points =  JSON.stringify(table_off[0].pontos,null,4).slice(1, -1);
    var matches =  JSON.stringify(table_off[0].jogos,null,4).slice(1, -1);

    speechText += firstPlace + " is leading the Brazilian Championship with " + points + " points after " +
      matches + " games.";

    return handlerInput.responseBuilder
      .speak(speechText)
      .withShouldEndSession(false)
      .withSimpleCard(SKILL_NAME, speechText)
      .getResponse();
  },
};

const LibertadoresIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'libertadoresIntent';
  },
  async handle(handlerInput) {
    console.log("[INFO]: " + handlerInput.requestEnvelope.request.intent.name);

    // await standings(handlerInput);
    var speechText = "The teams that are currently qualified to the Libertadores are: ";
    var counter = 0;

    for(counter; counter < 4; counter++) {
      if(counter < 2) {
        speechText += JSON.stringify(table_off[counter].nome,null,4).slice(1,-1) + ", ";
      } else {
        speechText += JSON.stringify(table_off[counter].nome,null,4).slice(1,-1) +
        " and ";
        counter++;
        speechText += JSON.stringify(table_off[counter].nome,null,4).slice(1,-1) + ". ";
      }
    }

    speechText += "The teams that will have to play the pre Libertadores are: " +
      JSON.stringify(table_off[counter].nome,null,4).slice(1,-1) + " and ";
    counter++;
    speechText += JSON.stringify(table_off[counter].nome,null,4).slice(1,-1) + ". ";

    return handlerInput.responseBuilder
      .speak(speechText)
      .withShouldEndSession(false)
      .withSimpleCard(SKILL_NAME, speechText)
      .getResponse();
  },
};

const SulamericanaIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'sulamericanaIntent';
  },
  async handle(handlerInput) {
    console.log("[INFO]: " + handlerInput.requestEnvelope.request.intent.name);

    // await standings(handlerInput);
    var speechText = "The teams that are currently qualified to the Sul Americana are: ";
    var counter = 6;

    for(counter; counter < 12; counter++) {
      if(counter < 10) {
        speechText += JSON.stringify(table_off[counter].nome,null,4).slice(1,-1) + ", ";
      } else {
        speechText += JSON.stringify(table_off[counter].nome,null,4).slice(1,-1) +
        " and ";
        counter++;
        speechText += JSON.stringify(table_off[counter].nome,null,4).slice(1,-1) + ". ";
      }
    }

    return handlerInput.responseBuilder
      .speak(speechText)
      .withShouldEndSession(false)
      .withSimpleCard(SKILL_NAME, speechText)
      .getResponse();
  }
};

// TODO: work out the logic and speech
const RelegationIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'relegationIntent';
  },
  async handle(handlerInput) {
    console.log("[INFO]: " + handlerInput.requestEnvelope.request.intent.name);

    // await standings(handlerInput);
    var speechText = "The teams that are currently facing relegation are: ";
    var counter = 16;

    for(counter; counter < 20; counter++) {
      if(counter < 18) {
        speechText += JSON.stringify(table_off[counter].nome,null,4).slice(1,-1) + ", ";
      } else {
        speechText += JSON.stringify(table_off[counter].nome,null,4).slice(1,-1) +
        " and ";
        counter++;
        speechText += JSON.stringify(table_off[counter].nome,null,4).slice(1,-1) + ". ";
      }
    }

    return handlerInput.responseBuilder
      .speak(speechText)
      .withShouldEndSession(false)
      .withSimpleCard(SKILL_NAME, speechText)
      .getResponse();
  }
};

// TODO: work out the logic and speech
const StandingsIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'standingsIntent';
  },
  async handle(handlerInput) {
    console.log("[INFO]: " + handlerInput.requestEnvelope.request.intent.name);
    var speechText = '';
    const attributes = handlerInput.attributesManager.getSessionAttributes();

   //  await standings(handlerInput);
   //
   // let table = attributes.table;


    speechText = " After " + JSON.stringify(table_off[0].jogos,null,4).slice(1, -1) +
      " matches, the leader of the Brazilian Championship is: " + JSON.stringify(table_off[0].nome,null,4).slice(1, -1) +
      " with " + JSON.stringify(table_off[0].pontos,null,4).slice(1, -1) + " points. Would you like to hear the rest?";

    attributes.currentIndex = 1;


    // attributes.table = table;
    handlerInput.attributesManager.setSessionAttributes(attributes);

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(SKILL_NAME, speechText)
      .getResponse();
  }
};

const HearMoreIntentHandler = { 
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'hearMoreIntent';
  },
  async handle(handlerInput) {
    console.log("[INFO]: " + handlerInput.requestEnvelope.request.intent.name);
    var speechText = '';
    const attributes = handlerInput.attributesManager.getSessionAttributes();

    var position = attributes.currentIndex;
    console.log(position);
    for(var i = 0; i < PAGINATION_SIZE; i++) {
      // speechText +=
    }

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(SKILL_NAME, speechText)
      .getResponse();
  }
};

// TODO: work out the logic and speech
const NameIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'nameIntent';
  },
  async handle(handlerInput) {
    console.log("[INFO]: " + handlerInput.requestEnvelope.request.intent.name);

    // await standings(handlerInput);
  },
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    console.log("[INFO]: " + handlerInput.requestEnvelope.request.intent.name);
    const speechText = 'You can say hello to me!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard(SKILL_NAME, speechText)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    console.log("[INFO]: " + handlerInput.requestEnvelope.request.intent.name);
    const speechText = 'Goodbye!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(SKILL_NAME, speechText)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log("[INFO]: " + handlerInput.requestEnvelope.request.type);
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log("[ERROR] ErrorHandler");
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .reprompt('Sorry, I can\'t understand the command. Please say again.')
      .getResponse();
  },
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    FirstPlaceIntentHandler,
    LibertadoresIntentHandler,
    SulamericanaIntentHandler,
    RelegationIntentHandler,
    StandingsIntentHandler,
    HearMoreIntentHandler,
    NameIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addResponseInterceptors(function(requestEnvelope, response) {
    console.log("\n" + "********** REQUEST ENVELOPE *********\n" + JSON.stringify(requestEnvelope, null, 4));
    console.log("\n" + "************* RESPONSE **************\n" + JSON.stringify(response, null, 4));
  })
  .addErrorHandlers(ErrorHandler)
  .lambda();


async function standings(handlerInput) {
  const attributes = handlerInput.attributesManager.getSessionAttributes();

  if (attributes.table == undefined) {
    const serie = 'a';

    let table = await cb.tabela(serie).then(function(table) {
      return table;
    }, function(err){
	     console.log(err);
     });

     attributes.table = table;
     handlerInput.attributesManager.setSessionAttributes(attributes);
     // console.log('[INFO] standings table: ' + JSON.stringify(attributes.table, null, 4));
   } else {
     return;
   }
}
