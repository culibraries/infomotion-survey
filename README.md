# InfomotionSurvey

InfoMotion staff would like cart-mounted mobile device (simple tablet) to capture service feedback from patrons. The app is implemented by Angular 7. Angular CLI - version 7.2.2.

## Installing

```
git clone git@github.com:culibraries/infomotion-survey.git infomotion

cd infomotion

npm install

# run at localhost:4200
ng serve -o
```

## Prerequisites

You will need to have an account in order to login to the app. Contact to LIT CU Boulder for more information

## Build

Local:
`ng build --output-path="[path]/cybercom/data/static/infomotion" --base-href "/infomotion/"`.

Production
`ng build --prod --output-path="[path]" --base-href "/infomotion/"`.

## Icon source

https://www.flaticon.com/free-icon/happy_132320
Icon Actived Color: #28A745

https://www.flaticon.com/free-icon/calm_132319
Icon Actived Color: #FFC107

https://www.flaticon.com/free-icon/sad_132294
Icon Actived Color: #DC3545

## Wiki

https://github.com/culibraries/infomotion-survey/wiki

## TODO
1. Swtich the authentication method from using Session to Token-based (JWT)
2. Intergrate with IdentiKey System/Grouper at CU Boulder
3. CI/CD using Racher to deploy to AWS EC2

## License

Libraries IT - University Of Colorado - Boulder
