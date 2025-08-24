"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";

export default function Home() {
  const [helloMessage, setHelloMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const fetchHelloMessage = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/hello');
      const data = await response.json();
      setHelloMessage(data.message);
    } catch (error) {
      console.error('Error fetching hello message:', error);
      setHelloMessage('Error loading message');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHelloMessage();
  }, []);
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={`${styles.logoContainer} ${styles.container} ${styles.default}`}>
          <div className={styles.wrapper}>
            <div className={styles.inner}>
              <h1 className={styles.logoTitle}>EasyRunner</h1>
            </div>
          </div>
        </div>
        <ol>
          <li>
            Get started with <strong>EasyRunner</strong> - simple self-managed app hosting.
          </li>
          <li>Own your stack, no surprise bills!2222</li>
          <li>Something something something</li>
        </ol>

        <div className={styles.apiSection}>
          <h3>API Response Demo</h3>
          {loading ? (
            <p className={styles.loadingText}>Loading...</p>
          ) : (
            <div className={styles.apiResponse}>{helloMessage}</div>
          )}
          <button
            onClick={fetchHelloMessage}
            className={styles.refreshButton}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Refresh Time'}
          </button>
        </div>

        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="https://easyrunner.xyz"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={styles.logo}
              src="/globe.svg"
              alt="EasyRunner"
              width={20}
              height={20}
            />
            Visit EasyRunner
          </a>
          <a
            href="https://docs.easyrunner.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            Read the docs
          </a>
        </div>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://easyrunner.xyz/learn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn EasyRunner
        </a>
        <a
          href="https://easyrunner.xyz/examples"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://easyrunner.xyz"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to EasyRunner →
        </a>
      </footer>
    </div>
  );
}
