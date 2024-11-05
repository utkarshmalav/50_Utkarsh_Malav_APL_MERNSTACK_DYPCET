import React, { useState } from 'react';
import { PDFDownloadLink, Document, Page, Text, StyleSheet } from '@react-pdf/renderer';
import './App.css';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 30,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});

 
const CertificateDocument = ({ fullName }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Certificate of Completion</Text>
      <Text style={styles.text}>
        This is to certify that <Text style={{ fontWeight: 'bold' }}>{fullName}</Text> has successfully completed the Node.js virtual lab from DYPCET Virtual Lab.
      </Text>
    </Page>
  </Document>
);


function App() {
  const topics = ['Introduction', 'Uses', 'Installation', 'Modules', 'Events'];
  const [selectedTopic, setSelectedTopic] = useState('Introduction');
  const [completed, setCompleted] = useState({
    Introduction: false,
    Uses: false,
    Installation: false,
    Modules: false,
    Events: false,
  });
  const [fullName, setFullName] = useState('');

  const handleMarkAsCompleted = (topic) => {
    setCompleted((prev) => ({ ...prev, [topic]: true }));
  };

  const getCompletionPercentage = () => {
    const completedTopics = Object.values(completed).filter((c) => c).length;
    return (completedTopics / topics.length) * 100;
  };

  const renderContent = () => {
    switch (selectedTopic) {
      case 'Introduction':
        return (
          <div>
            <h3>Introduction to NodeJS</h3>
            <iframe
              width="800"
              height="450"
              src="https://www.youtube.com/embed/TlB_eWDSMt4?si=0xSvOX1r1iPnAFSb"
              title="NodeJS Introduction"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <div className="info">
              <h4>What is Node.js?</h4>
              <p>
                Node.js is an open-source, cross-platform JavaScript runtime
                environment that executes JavaScript code outside of a web
                browser. It’s designed for building scalable network applications
                and can handle thousands of connections simultaneously.
              </p>
              <h4>Key Features:</h4>
              <ul>
                <li>Event-driven, non-blocking I/O model</li>
                <li>Uses JavaScript on the server-side</li>
                <li>
                  Highly scalable and efficient for handling concurrent requests
                </li>
              </ul>
              {!completed.Introduction && (
                <button onClick={() => handleMarkAsCompleted('Introduction')}>
                  Mark as Completed
                </button>
              )}
            </div>
          </div>
        );
      case 'Uses':
        return (
          <div>
            <h3>Uses of NodeJS</h3>
            <div className="info">
              <h4>Why Use NodeJS?</h4>
              <p>
                Node.js is primarily used for building fast, scalable, and
                efficient web applications. It is particularly well-suited for:
              </p>
              <ul>
                <li>Real-time applications (chat applications, online gaming)</li>
                <li>API services for websites and mobile apps</li>
                <li>Data streaming applications</li>
                <li>Single-page applications (SPA)</li>
              </ul>
              <h4>Companies Using Node.js:</h4>
              <ul>
                <li>LinkedIn</li>
                <li>Netflix</li>
                <li>Uber</li>
                <li>PayPal</li>
              </ul>
              {!completed.Uses && (
                <button onClick={() => handleMarkAsCompleted('Uses')}>
                  Mark as Completed
                </button>
              )}
            </div>
          </div>
        );
      case 'Installation':
        return (
          <div>
            <h3>Installation of NodeJS</h3>
            <div className="info">
              <h4>Steps to Install Node.js:</h4>
              <ol>
                <li>
                  Go to the official website:{' '}
                  <a href="https://nodejs.org" target="_blank" rel="noreferrer">
                    nodejs.org
                  </a>
                </li>
                <li>Download the version compatible with your OS (Windows, Mac, Linux).</li>
                <li>Run the installer and follow the setup instructions.</li>
                <li>
                  Verify installation: Open a terminal and type <code>node -v</code> to check the Node.js version installed.
                </li>
                <li>Install the Node Package Manager (NPM) which comes bundled with Node.js.</li>
              </ol>
              {!completed.Installation && (
                <button onClick={() => handleMarkAsCompleted('Installation')}>
                  Mark as Completed
                </button>
              )}
            </div>
          </div>
        );
      case 'Modules':
        return (
          <div>
            <h3>NodeJS Modules</h3>
            <div className="info">
              <h4>Common Built-in Modules:</h4>
              <ul>
                <li>
                  <strong>fs (File System)</strong>: For file handling, reading, writing, and managing files.
                </li>
                <li>
                  <strong>http</strong>: For creating web servers and handling HTTP requests.
                </li>
                <li>
                  <strong>path</strong>: For working with file and directory paths.
                </li>
                <li>
                  <strong>events</strong>: For handling events asynchronously in Node.js.
                </li>
              </ul>
              {!completed.Modules && (
                <button onClick={() => handleMarkAsCompleted('Modules')}>
                  Mark as Completed
                </button>
              )}
            </div>
          </div>
        );
      case 'Events':
        return (
          <div>
            <h3>NodeJS Events</h3>
            <div className="info">
              <h4>Understanding Events in Node.js:</h4>
              <p>
                Node.js is event-driven, which means it heavily relies on events for asynchronous operations. An <em>event</em> can be anything that happens, like clicking a button, receiving an HTTP request, or a file system action.
              </p>
              <h4>Example:</h4>
              <p>Using the <code>events</code> module:</p>
              <pre>
                {`
const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

// Create an event listener
eventEmitter.on('greet', () => {
  console.log('Hello, world!');
});

// Trigger the event
eventEmitter.emit('greet');
`}
              </pre>
              {!completed.Events && (
                <button onClick={() => handleMarkAsCompleted('Events')}>
                  Mark as Completed
                </button>
              )}
            </div>
          </div>
        );
      default:
        return <p>Select a topic from the left to start learning.</p>;
    }
  };

  const renderCompletionButton = () => {
    const completionPercentage = getCompletionPercentage();
    if (completionPercentage === 100) {
      return (
        <div>
          <h3>Congratulations! You have completed all modules.</h3>
          
          <h3>Download Certificate</h3>
          <input
            type="text"
            placeholder="Enter Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          {fullName && (
            <PDFDownloadLink document={<CertificateDocument fullName={fullName} />} fileName="certificate.pdf">
              <button>Download Certificate</button>
            </PDFDownloadLink>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>DYPCET Virtual Lab</h1>
      </header>
      <div className="content">
        <aside className="sidebar">
          <h2>NodeJS</h2>
          <p className={getCompletionPercentage() === 100 ? 'completed' : ''}>
            Completion: {getCompletionPercentage().toFixed(0)}%
          </p>
          <ul>
            {topics.map((topic) => (
              <li
                key={topic}
                onClick={() => setSelectedTopic(topic)}
                className={selectedTopic === topic ? 'active' : ''}
              >
                {topic} {completed[topic] && '✔'}
              </li>
            ))}
          </ul>
          {renderCompletionButton()} { }
        </aside>
        <main className="main-content">{renderContent()}</main>
      </div>
    </div>
  );
}

export default App;
