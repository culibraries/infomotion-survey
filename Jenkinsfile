node {
  /*
    stage('CHECKOUT') {
        git(branch: 'devops', credentialsId: 'dutr5288-github', url: 'git@github.com:culibraries/infomotion-survey.git')
    }
    stage('BUILD') {
        app = docker.build('culibraries/infomotion:1.1.0')
    }
    stage('PUSH TO DOCKERHUB') {
      docker.withRegistry( '', 'trinhdh-dockerhub' ) {
        app.push()
      }
    }*/
   stage('DEPLOY') {
         sh 'kubectl get pods -n cybercom'
  }
}
