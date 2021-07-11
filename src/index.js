import React from "react";
import ReactDOM from "react-dom";
import * as Survey from "survey-react";
import "./styles.css";
//import "survey-react/survey.css";
import 'survey-react/modern.css';
import Typography from '@material-ui/core/Typography'
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

Survey.StylesManager.applyTheme('modern');

const refreshPage = ()=>{
  window.location.reload();
}  

var json = {
  title: "SDN EPG Wizard ",
  triggers: [
          {
              type: "complete",
              expression: "{einstieg} = 'item1'"
          }, {
              type: "complete",
              expression: "{einstieg} = 'item2'"

          }, {
              type: "complete",
              expression: "{einstieg} = 'item3'"    
            }, {
              type: "complete",
              expression: "{einstieg} = 'item4'"
            }, {
              type: "complete",
              expression: "{fa} = 'Service'"
            }, {
              type: "complete",
              expression: "{zweck} != 'FA'"
            }
        ],
      pages: [
        {
          name: "page1",
          elements: [
            {
              type: "html",
              name: "question0",
              html:
                "Folgende Fragen müssen pro System einer Anwendung / einer Plattform beantwortet werden! (d.h. bei einer Anwendung mit 3 Application Servern und einer DB insgesamt viermal)"
            }
          ],
          questionTitleLocation: "top",
          title: "Bitte beachten:"
        },
        {
          name: "Einstieg",
          elements: [
            {
              type: "radiogroup",
              name: "einstieg",
              title: "Bitte die Frage auswählen, die auf dein System zutrifft. Falls du keine der Fragen mit \"Ja\" beantworten kannst, wähle die letzte Auswahl.",
              hideNumber: true,
              isRequired: true,
              choices: [
                {
                  value: "item1",
                  text: "Hat das System mehr als eine IP-Adresse / Default Gateway?"
                },
                {
                  value: "item2",
                  text: "Ist das System Teil einer RZ-übergreifenden aktiv-aktiv Anwendungslandschaft?"
                },
                {
                  value: "item3",
                  text: "Ist das System ein Gateway in der PEZ (zuständig für Session Terminierung, Authentisierung, ...)"
                },
                {
                  value: "item4",
                  text: "Werden auf dem System andere Systeme in unterschiedlichen Zonen virtualisiert betrieben?"
                },
                {
                  value: "item5",
                  text: "Keines der Genannten trifft zu."
                }
              ]
            }
          ],          
        },
        {
          name: "RZ",
          elements: [
            {
              type: "radiogroup",
              name: "rz",
              title: "In welchem RZ steht das neue System?",
              hideNumber: true,
              isRequired: true,
              choices: [
                {
                  value: "A",
                  text: "RZ Primus, Linie A"
                },
                {
                  value: "P",
                  text: "RZ Primus, Linie P"
                },
                {
                  value: "C",
                  text: "RZ Primus, Linie C"
                },
                {
                  value: "Legacy",
                  text: "RZ Primus, Legacy Infrastruktur"
                }
              ]
            }
          ],
        },
        {
          name: "FA",
          elements: [
            {
              type: "radiogroup",
              name: "fa",
              title: "Ist das System für eine Fachanwendung eines Kunden (inklusive BIT)?",
              hideNumber: true,
              isRequired: true,
              choices: [
                {
                  value: "Fachanwendung",
                  text: "Ja"
                },
                {
                  value: "Service",
                  text: "Nein"
                }
              ]
            },{
              type: "dropdown",
              name: "services",
              title: "Ist das System für einen der folgenden Services vorgesehen?",
              visibleIf: "{fa}='Service'",
              isRequired: true,
              colCount: 0,
              choices: [
                  "Verzeichnisdienst (ausser AD)",
                  "Verzeichnisdienst AD Domain Controller ADR",
                  "Verzeichnisdienst AD Domain Controller AD-SSZ",
                  "Verzeichnisdienst AD Domain Controller ADB",
                  "Identity Mgmt. (eIAM, DirX,...) Access Mgmt. (eIAM, ...)",
                  "Mgmt. von Systemen (WSUS, SCCM, KMS, ...)",
                  "Logging (syslog Server Zone, Splunk) Monitoring (SNMP Server, Patrol, ...)",
                  "Messaging (Exchange, Lync)",
                  "Sicherheits-Tools (FortiSandbox, nessus, ...)",
                  "Netzwerk-Dienste (DNS, NTP, DHCP)",
                  "Orchestration (Urban Code)",
                  "Repositorys",
                  "Mgmt von Storage und Backup",
                  "Mgmt von Netzwerk-Elementen (FortiManager, Cisco APIC)",
                  "Mgmt von Hardware (HP OneView)",
                  "Datenbank-Systeme",
                  "Storage-Systeme",
                  "Backupserver-Systeme"
              ]
            }
          ],
        },
        {
          name: "Sicherheit",
          elements: [
            {
              type: "radiogroup",
              name: "sicherheit",
              title: "Sollen auf dem System Daten mit erhöhtem Schutzbedarf bearbeitet, angezeigt oder gespeichert werden?",
              hideNumber: true,
              isRequired: true,
              choices: [
                {
                  value: "ES",
                  text: "Ja"
                },
                {
                  value: "GS",
                  text: "Nein"
                }
              ]
            }
          ],
        },
        {
          name: "Produktion",
          elements: [
            {
              type: "radiogroup",
              name: "produktion",
              title: "Ist das System für produktive Nutzung vorgesehen?",
              description: "Produktiv aus Kundensicht: Die Anwendung / der Service wird vom Kunden / Benutzer produktiv genutzt.  nicht-produktiv: Entwicklungs-, Test-, Schulungs-, Integrations-, Abnahme- oder  Referenz-Umgebung einer Anwendung eines Kunden, Abnahme-Umgebung eines Service",
              hideNumber: true,
              isRequired: true,
              choices: [
                {
                  value: "PR",
                  text: "Ja"
                },
                {
                  value: "NP",
                  text: "Nein"
                }
              ]
            }
          ],
        },
        {
          name: "Zweck",
          elements: [
            {
              type: "radiogroup",
              name: "zweck",
              title: "Ist das System für einen der folgenden Zwecke vorgesehen?",
              hideNumber: true,
              isRequired: true,
              choices: [
                {
                  value: "FA",
                  text: "Anwendungsserver / Webserver"
                },
                {
                  value: "DB",
                  text: "Datenbank-System"
                },
                {
                  value: "Storage",
                  text: "Storage-System"
                },
                {
                  value: "Backup",
                  text: "Backupserver-System"
                }
              ]
            }
          ],
        },
        {
          name: "Benutzer",
          elements: [
            {
              type: "dropdown",
              name: "benutzer",
              title: "Ort der Benutzerverwaltung der Fachapplikation?",
              isRequired: true,
              colCount: 0,
              choices: [
                  "Active Directory",
                  "SAP",
                  "IdM",
                  "eIAM",
                  "LDAP",
                  "AAA",
                  "keine"
              ]
            },
            {
              type: "dropdown",
              visibleIf: "{benutzer} = 'Active Directory'",
              name: "ad",
              title: "In welches Active-Directory wird/ist das System gejoint?",
              isRequired: true,
              colCount: 0,
              choices: [
                  "ADR",
                  "ADSSZ",
                  "sonstiges AD (nicht aufgelistet, z.B. ADB, AD EDA, ...)",
                  "(zukünftige Möglichkeit) AD-Frontend, AD-Backend"
              ]
            },
            {
              type: "radiogroup",
              name: "zugriff",
              visibleIf: "{ad} = 'sonstiges AD (nicht aufgelistet, z.B. ADB, AD EDA, ...)' or {ad} = '(zukünftige Möglichkeit) AD-Frontend, AD-Backend'",
              title: "Woher kommen die Zugriffe auf die Systeme?",
              hideNumber: true,
              isRequired: true,
              choices: [
                {
                  value: "FE_1",
                  text: "von Benutzern im Internet oder aus Kantonen, bundesnahen Organisationen"
                },
                {
                  value: "FE_2",
                  text: "von Systemen im Internet"
                },
                {
                  value: "BE_1",
                  text: "von Benutzern aus internen Netzen (CZ-APS)"
                },
                {
                  value: "BE_2",
                  text: "von internen Systemen (SZ, SZP, SVZ, ...)"
                }
              ]
            }
          ],
        },
      ],
      showProgressBar: "top",
      progressBarType: "questions",
      goNextPageAutomatic: false,
      startSurveyText: "Los geht's",
      completeText: "Fertig",
      firstPageIsStarted: true,
      showTitle: true,
      showQuestionNumbers: "on",
      questionTitleLocation: "top",
      questionErrorLocation: "bottom"
    };
    
class SurveyComponent extends React.Component {

  constructor(props) {
    super(props);
  
    this.model = new Survey.Model(json);
    this.state = { isCompleted: false, isAborted: false, data: ""};
    this.onCompleteComponent = this.onCompleteComponent.bind(this)
    this.displayResultsComponent = this.displayResultsComponent.bind(this)

  }

  onCompleteComponent() {
    //this.setState({ isCompleted: true });
    const hasValue = JSON.stringify(this.model.data, null, 3).includes("rz");

    if (hasValue) {
      this.setState({ isCompleted: true, data: this.model.data});
    } else {
      this.setState({ isCompleted: true, isAborted: true, data: this.model.data});
    }
  }

  displayResultsComponent() {

    var svzEpgServices = new Map([["Verzeichnisdienst (ausser AD)","ACCMGMT"],
    ["Verzeichnisdienst AD Domain Controller ADR","DIRSVC"],
    ["Verzeichnisdienst AD Domain Controller AD-SSZ","DIRSVC"],
    ["Verzeichnisdienst AD Domain Controller ADB","DIRSVC"],
    ["Identity Mgmt. (eIAM, DirX,...) Access Mgmt. (eIAM, ...)","IDMGMT"],
    ["Mgmt. von Systemen (WSUS, SCCM, KMS, ...)","SYSMGMT"],
    ["Logging (syslog Server Zone, Splunk) Monitoring (SNMP Server, Patrol, ...)","LOGGING"],
    ["Messaging (Exchange, Lync)","MESSAGING"],
    ["Sicherheits-Tools (FortiSandbox, nessus, ...)","SECSW"],
    ["Netzwerk-Dienste (DNS, NTP, DHCP)","NETWSVC"],
    ["Orchestration (Urban Code)","ORCH"],
    ["Repositorys","REP"],
    ["Mgmt von Storage und Backup","STOMGMT"],
    ["Mgmt von Netzwerk-Elementen (FortiManager, Cisco APIC)","NETWMGMT"],
    ["Mgmt von Hardware (HP OneView)","HWMGMT"],
    ["Datenbank-Systeme","DB"],
    ["Storage-Systeme","NAS"],
    ["Backupserver-Systeme","BACKUP"]]);

    var directories = new Map([["ADR","ADR"],
    ["ADSSZ","ADSSZ"],
    ["sonstiges AD (nicht aufgelistet, z.B. ADB, AD EDA, ...)","Sonstige"],
    ["(zukünftige Möglichkeit) AD-Frontend, AD-Backend","FE_BE"]]);

    var result = "";
    var str = JSON.stringify(this.state.data);
    console.log(str)
    var map = new Map(Object.entries(JSON.parse(str)));
    var rzLine = map.get("rz");
    rzLine = (rzLine === "A") ? rzLine + "2" : rzLine;
    var service = svzEpgServices.get(map.get("services"));
    var withSVZ = JSON.stringify(this.model.data, null, 3).includes("services");

    if (withSVZ){
      result = rzLine + "_SVZ_" + "BIT_" + service;
    }else{
      var sicherheit = map.get("sicherheit");
      var environment = "_" + map.get("produktion");
      var netzwerkZone = (sicherheit === "ES") ? "_SZP" : "_SZ"
      var fachanwendung = "";
      var activeDirectory = "";
      var esSicherheit = (netzwerkZone === "_SZP") ? "_ES" : ""
      var beutzerVerwaltung = map.get("benutzer");

      switch (map.get("zweck"))
      {
        case "FA":
          if (directories.get(map.get("ad")) !== ("Sonstige" || "FE_BE")){
            activeDirectory = esSicherheit + "_" + directories.get(map.get("ad"));}
            else{
              var neueAds = (map.get("zugriff") === ("FE_1" || "FE_2")) ? "FE" : "BE"
              activeDirectory = esSicherheit + "_" + neueAds
            }
          if (beutzerVerwaltung !== "Active Directory"){
              activeDirectory = esSicherheit + "_FE"
          } 
          break;
        case "DB":
          fachanwendung = "_DB"
          break;
        case "Storage": 
          fachanwendung = "_NAS"
          break;
        case "Backup":
          fachanwendung = "_BACKUP"
          break;
        default: 
          break;
      }

      if (netzwerkZone === "_SZP" && rzLine === "A")
        rzLine = "P"

      result = rzLine + netzwerkZone + "_BIT" +
      activeDirectory + fachanwendung
      + environment;
    }

    return(
      <Grid container 
        spacing={1} 
        alignItems="center" 
        justifyContent="center" 
        direction="column"
        style={{ minHeight: '20vh' }}>
        <Grid >
        <AppBar position="fixed" style={{ background: '#18a689' }}>
        <Toolbar>
        <Typography>
          Ergebnis
        </Typography>
      </Toolbar>
    </AppBar>
    </Grid>
      <Grid item xs style={{marginTop: 80}}>
      <Typography>
      {result}
      </Typography>
      <Grid item xs>
      <Button variant="contained" onClick={refreshPage} style={{marginTop: 30}}>
      Beenden
      </Button>
      </Grid>
      </Grid>
    </Grid>
    );
  }

  render(){

    var result = "Failed";

    if (this.state.isCompleted && !this.state.isAborted) 
      {result = this.displayResultsComponent();}

    
    var surveyRender = !this.state.isCompleted ? (
      <Survey.Survey
        model={this.model}
        showCompletedPage={false}
        onComplete={this.onCompleteComponent}
        displayResults={this.displayResultsComponent}
      />
    ) : null;
    
    var onCompleteComponent = (this.state.isCompleted && !this.state.isAborted) ? (
      <div>
      {result}
      </div>
    ) : (this.state.isCompleted && this.state.isAborted) ? (
      <div>
      <Grid container 
      spacing={1} 
      alignItems="center" 
      justifyContent="center" 
      direction="column"
      style={{ minHeight: '20vh' }}>
        <Grid>
        <AppBar position="fixed" style={{ background: '#18a689' }}>
        <Toolbar>
        <Typography>
          Ergebnis
        </Typography>
        </Toolbar>
      </AppBar>
      </Grid>
        <Grid item xs style={{marginTop: 80}}>
        <Typography align='center'>        
        Leider kann der Wizard nicht benutzt werden, sondern es muss direkt mit der Architektur Kontakt aufgenommen werden. 
      </Typography>
        </Grid>
      <Grid item xs>
      <Button variant="contained" onClick={refreshPage} >
        Beenden
        </Button>
      </Grid>
      </Grid>
      </div>
    ) : null;
    
    return (
      <div>
        {surveyRender}
        {onCompleteComponent}
 
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <SurveyComponent />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
