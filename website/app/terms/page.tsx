import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "BalanceUI Terms of Service",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link
          href="/"
          className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        >
          ← Back to Home
        </Link>
      </div>

      <div className="prose prose-lg max-w-none">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
          Terms of Service
        </h1>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="mt-8 space-y-6 text-gray-700 dark:text-gray-300">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              Acceptance of Terms
            </h2>
            <p className="mb-4">
              By accessing and using BalanceUI, you accept and agree to be bound by the terms
              and provision of this agreement. If you do not agree to these terms, please do
              not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              Use License
            </h2>
            <p className="mb-4">
              BalanceUI is provided under the MIT License. You are granted permission to use,
              modify, and distribute the software in accordance with the license terms. This
              license does not grant you any rights to use our trademarks, service marks, or
              other brand features.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              Open Source
            </h2>
            <p className="mb-4">
              BalanceUI is an open-source project. The source code is available on GitHub and
              is free to use, modify, and distribute under the MIT License.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              Disclaimer
            </h2>
            <p className="mb-4">
              The materials on BalanceUI's website are provided on an 'as is' basis. BalanceUI
              makes no warranties, expressed or implied, and hereby disclaims and negates all
              other warranties including, without limitation, implied warranties or conditions
              of merchantability, fitness for a particular purpose, or non-infringement of
              intellectual property or other violation of rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              Limitations
            </h2>
            <p className="mb-4">
              In no event shall BalanceUI or its suppliers be liable for any damages (including,
              without limitation, damages for loss of data or profit, or due to business
              interruption) arising out of the use or inability to use the materials on
              BalanceUI's website, even if BalanceUI or a BalanceUI authorized representative
              has been notified orally or in writing of the possibility of such damage.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              Accuracy of Materials
            </h2>
            <p className="mb-4">
              The materials appearing on BalanceUI's website could include technical,
              typographical, or photographic errors. BalanceUI does not warrant that any of the
              materials on its website are accurate, complete, or current.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              Modifications
            </h2>
            <p className="mb-4">
              BalanceUI may revise these terms of service at any time without notice. By using
              this website, you are agreeing to be bound by the then current version of these
              terms of service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              Contact Information
            </h2>
            <p className="mb-4">
              If you have any questions about these Terms of Service, please contact us through
              our website or GitHub repository.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

