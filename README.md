Solving the Eau Claire snow parking issue, preventing tickets one ticket at a time

## Proposed API

### GET /status

For consumption by front end applications to get the current snow parking status

```
{
	error: String | false,
	alternateSideParking: even|odd|false,
	startTime: timestamp|null,
	endTime: timestamp|null
}
```

### GET /schedule

For consumption by front end applications to get projected snow parking statuses

```
{
	error: String | false,
	schedule: [
		{
			alternateSideParking: even|odd,
			startTime: timestamp,
			endTime: timestamp
		},
		{
			alternateSideParking: even|odd,
			startTime: timestamp,
			endTime: timestamp
		},
		...
	]
}
```

### POST /notification

Collect notifications emails from http://eauclairewi.gov/about-us/sign-up-for-e-notifications and place them in our database

```
{
  fromAddress: (Name <address@domain.com>),
  bodyPlain: (email body),
  receivedAt: timestamp
}
```
#### IFTTT Gmail Trigger

"Any new email in inbox for"

Could be setup with filters, etc, but this keeps it simple.  A single purpose gmail account where we expect all emails to be from the city.

#### IFTTT Maker Action

##### URL

http://{DevOrProduction.com}/notification

##### Method

Post

##### Content Type:

application/json

##### Body
```
{
    fromAddress:"<<<{{FromAddress}}>>>",
    subject:"<<<{{Subject}}>>>",
    receivedAt:"<<<{{ReceivedAt}}>>>"
}
```

Note: Originally intended to include the email body included in IFTTT Maker Body
```
 bodyPlain:"<<<{{BodyPlain}}>>>",
```
However IFTTT doesn't want to pass it along nicely.  It may be due to the city's Base64 email body encoding.  More investigation may solve this, but it could take a few hours of developer time, and the subject we expect to suffice.

This could be resolved maybe using Zapier instead with custom receiver addresses, and optionally a gmail forwarding to reformat it. However they have a free zap limit we don't want to test (and they change it from time to time). There also may be another solution using IFTTT we haven't discovered.

## Proposed API Infrastructure

I, Anthony, am comfortable enough with these technologies and think they fit our needs just fine. I'm hoping another couple around are also, but in the end it's at least JavaScript which most devs are familiar with, and could get up to speed hacking on quickly given a little setup guidance.

* node.js - Scalable will takes lots of hits creating an API. No need for a full MVC stack.
 * Express.js - "Fast, unopinionated, minimalist web framework for Node.js" (We need something for routes, ...) (Most Node.js REST server tutorials seem to point to using Express)
* MongoDB - Simple data store, could be anything really.  Will scale well enough.
* IFTTT - Connector to get from Email to our app
 * This: https://ifttt.com/email (Inbound email setup for subscription from http://eauclairewi.gov/about-us/sign-up-for-e-notifications)
 * That: https://ifttt.com/maker (To make an HTTP call to our application)
* AWS Free tier - Run everything on a single server.  Good for one year.
 
## Proposed API database structure

### Notifications
```
{
  subject: (email subject)
  body: (email body)
  received: timestamp
}
```

## Proposed API internal methods

Quick to code and dirty to start.  Optomize later iff needed.

### Method: ParseNotification(notfication)

Return: Array of objects defining alternate side parking like this (Relating to a single notification):
```
[
	{
		alternateSideParking: even|odd|false,
		startTime: timestamp,
		endTime: timestamp
	},
	...
]
```

### Method: GetSchedule()

Calls ParseNotification over all recent notifications in the database.

* Removes duplicates / smart choice of most recent notification
* Sorts schedule results newest first

Return: Array of objects defining alternate side parking like this (Relating to a all recent notifications):
```
[
	{
		alternateSideParking: even|odd|false,
		startTime: timestamp,
		endTime: timestamp
	},
	...
]
```

## Proposed API endpoint implementation

### GET /status

1. Call ```GetSchedule(...)```
2. Output if any results are in the current time frame

### GET /schedule

1. Call ```GetSchedule(...)```
2. Output all schedule results

### POST /notification

1. Call ```ParseNotification(...)```
2. Store result in MongoDB as JSON object
