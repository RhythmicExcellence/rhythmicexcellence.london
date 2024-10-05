var WEBHOOK_URL = 'WEBHOOK_URL';

function onSubmit(e) {
  var form = FormApp.getActiveForm();
  var allResponses = form.getResponses();
  var latestResponse = allResponses[allResponses.length - 1];
  var response = latestResponse.getItemResponses();
  var timestamp = latestResponse.getTimestamp();
  var payload = {
    title: form.getTitle(),
    formId: form.getId(),
    email: latestResponse.getRespondentEmail(),
    answers: [],
    timestamp,
  };

  for (var i = 0; i < response.length; i++) {
    var item = { question: null, answer: null };
    item.question = response[i].getItem().getTitle();
    item.answer = response[i].getResponse();
    payload.answers.push(item);
  }

  var options = {
    method: 'POST',
    contentType: 'application/json',
    payload: JSON.stringify(payload),
  };
  UrlFetchApp.fetch(WEBHOOK_URL, options);
}
