/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');

const cb = require('campeonato-brasileiro-api');

const APP_ID = "amzn1.ask.skill.f8349cd0-bf02-4bc1-88c8-6d21abbe93de";

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  async handle(handlerInput) {
    console.log("[INFO] LaunchRequestHandler");
    const speechText = 'Welcome to the Alexa Skills Kit, you can say yellow!';

    await standings(handlerInput);

      const attributes = handlerInput.attributesManager.getSessionAttributes();
  console.log('[INFO] LaunchRequest table: ' + JSON.stringify(attributes.table, null, 4));

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withShouldEndSession(false)
      .withSimpleCard('Hello World', speechText)
      .getResponse();
  },
};

const StandingsIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'standingsIntent';
  },
  async handle(handlerInput) {
    console.log("[INFO] StandingsIntentHandler");
    const speechText = 'Hello World!';
    const attributes = handlerInput.attributesManager.getSessionAttributes();

      if (attributes.table) {
         console.log('[INFO] if attributes.table: ' + attributes.table);
       } else {
           await standings(handlerInput);
           console.log('[INFO] else attributes.table: ' + attributes.table)
       }

       let table = attributes.table;

       

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Hello World', speechText)
      .getResponse();
  },
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    console.log("[INFO] HelpIntentHandler");
    const speechText = 'You can say hello to me!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Hello World', speechText)
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
    console.log("[INFO] CancelAndStopIntentHandler");
    const speechText = 'Goodbye!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Hello World', speechText)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log("[INFO] SessionEndedRequestHandler");
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
    StandingsIntentHandler,
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
  const serie = 'a';

  let table = await cb.tabela(serie).then(function(table) {
     return table;
   }, function(err){
	   console.log(err);
  });

  const attributes = handlerInput.attributesManager.getSessionAttributes();
  attributes.table = table;
  handlerInput.attributesManager.setSessionAttributes(attributes);
  console.log('[INFO] standings table: ' + JSON.stringify(attributes.table, null, 4));
}
