import React from "react";
import ReactDOM from "react-dom";
import * as Survey from "survey-react";
import "./styles.css";
//import "survey-react/survey.css";
import 'survey-react/modern.css';

Survey.StylesManager.applyTheme('modern');

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
              expression: "{fa} = 'item2'"
            }, {
              type: "complete",
              expression: "{zweck} != 'item1'"
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
                  value: "item1",
                  text: "RZ Primus, Linie A"
                },
                {
                  value: "item2",
                  text: "RZ Primus, Linie P"
                },
                {
                  value: "item3",
                  text: "RZ Primus, Linie C"
                },
                {
                  value: "item4",
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
                  value: "item1",
                  text: "Ja"
                },
                {
                  value: "item2",
                  text: "Nein"
                }
              ]
            },{
              type: "dropdown",
              name: "services",
              title: "Ist das System für einen der folgenden Services vorgesehen?",
              visibleIf: "{fa}='item2'",
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
                  value: "item1",
                  text: "Ja"
                },
                {
                  value: "item2",
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
                  value: "item1",
                  text: "Ja"
                },
                {
                  value: "item2",
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
                  value: "item1",
                  text: "Anwendungsserver / Webserver"
                },
                {
                  value: "item2",
                  text: "Datenbank-System"
                },
                {
                  value: "item3",
                  text: "Storage-System"
                },
                {
                  value: "item4",
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
              visibleIf: "{ad} = 'ADR' or {ad} = 'ADSSZ'",
              title: "Woher kommen die Zugriffe auf die Systeme?",
              hideNumber: true,
              isRequired: true,
              choices: [
                {
                  value: "item1",
                  text: "von Benutzern im Internet oder aus Kantonen, bundesnahen Organisationen"
                },
                {
                  value: "item2",
                  text: "von Systemen im Internet"
                },
                {
                  value: "item3",
                  text: "von Benutzern aus internen Netzen (CZ-APS)"
                },
                {
                  value: "item4",
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
    this.state = { isCompleted: false, isAborted: false };
    this.onCompleteComponent = this.onCompleteComponent.bind(this);
  }

  onCompleteComponent() {
    //this.setState({ isCompleted: true });
    const hasValue = JSON.stringify(this.model.data, null, 3).includes("rz");

    if (hasValue) {
      this.setState({ isCompleted: true });
    } else {
      this.setState({ isCompleted: true, isAborted: true });
    }
  }

  
  render(){

    var surveyRender = !this.state.isCompleted ? (
      <Survey.Survey
        model={this.model}
      
        showCompletedPage={false}
        onComplete={this.onCompleteComponent}
      />
    ) : null;
    
    var onCompleteComponent = (this.state.isCompleted && !this.state.isAborted) ? (
      <div>{JSON.stringify(this.model.data, null, 3)}</div>
    ) : (this.state.isCompleted && this.state.isAborted) ? (
      <div><h3>Leider kann der Wizard nicht benutzt werden, sondern es muss direkt mit der Architektur Kontakt aufgenommen werden.</h3></div>
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
