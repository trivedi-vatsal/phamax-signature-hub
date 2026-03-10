import React, { useRef, useState, useEffect } from "react";
import type { SignatureData } from "../types";
import { Copy, Download, Moon, Sun, CheckCircle2 } from "lucide-react";

interface SignaturePreviewProps {
  data: SignatureData;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const SignaturePreview: React.FC<SignaturePreviewProps> = ({
  data,
  isDarkMode,
  onToggleTheme,
}) => {
  const previewRef = useRef<HTMLDivElement>(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  // Compute the absolute base URL for images
  const baseUrl = `${window.location.origin}${import.meta.env.BASE_URL}`;

  const isComplete =
    data.fullName.trim() !== "" &&
    data.designation.trim() !== "" &&
    data.email.trim() !== "" &&
    data.mobile.trim() !== "" &&
    data.teams.trim() !== "" &&
    (data.templateType === "International" ? data.phone.trim() !== "" : true);

  const handleCopy = async () => {
    if (!isComplete) {
      alert(
        "Please fill out all mandatory fields (marked with *) before copying.",
      );
      return;
    }
    if (!previewRef.current) return;

    try {
      // Create a blob with the HTML content for rich text pasting (Outlook, Gmail)
      const html = previewRef.current.innerHTML;
      const blobHtml = new Blob([html], { type: "text/html" });
      const blobText = new Blob([previewRef.current.innerText], {
        type: "text/plain",
      });

      const clipboardItem = new ClipboardItem({
        "text/html": blobHtml,
        "text/plain": blobText,
      });

      await navigator.clipboard.write([clipboardItem]);
      setShowToast(true);
    } catch (err) {
      console.error(
        "Failed to copy via Clipboard API, falling back to execCommand",
        err,
      );
      // Fallback for older browsers
      const range = document.createRange();
      range.selectNode(previewRef.current);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
      try {
        document.execCommand("copy");
        selection?.removeAllRanges();
        setShowToast(true);
      } catch (fallbackErr) {
        console.error("Fallback copy failed", fallbackErr);
        alert("Failed to copy. Please select the text and copy manually.");
      }
    }
  };

  const handleExportHTML = () => {
    if (!isComplete) {
      alert(
        "Please fill out all mandatory fields (marked with *) before exporting HTML.",
      );
      return;
    }
    if (!previewRef.current) return;
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Email Signature</title>
</head>
<body>
${previewRef.current.innerHTML}
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "signature.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col bg-white p-5 rounded-xl shadow-sm border border-gray-100 w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium flex items-center text-gray-800">
          <svg
            className="w-5 h-5 mr-2 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          Live Preview
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={handleCopy}
            disabled={!isComplete}
            className={`flex items-center justify-center p-2 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 ${isComplete ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
            title={
              isComplete ? "Copy Signature" : "Fill all mandatory fields first"
            }
          >
            <Copy size={16} className="mr-1.5" />
            Copy
          </button>
          <button
            onClick={handleExportHTML}
            disabled={!isComplete}
            className={`flex items-center justify-center p-2 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-1 ${isComplete ? "bg-white border border-gray-300 hover:bg-gray-50 text-gray-700" : "bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed"}`}
            title={
              isComplete ? "Export HTML" : "Fill all mandatory fields first"
            }
          >
            <Download size={16} className="mr-1.5" />
            Export
          </button>
          <button
            onClick={onToggleTheme}
            className="p-2 ml-1 rounded-md hover:bg-gray-100 text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-1"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>

      {showToast && (
        <div className="fixed bottom-4 right-4 bg-gray-900 border border-gray-700 text-white px-4 py-3 rounded-lg shadow-xl flex items-center space-x-3 transition-opacity duration-300 z-50 animate-fade-in-up">
          <CheckCircle2 className="text-green-400 w-5 h-5 flex-shrink-0" />
          <p className="font-medium text-sm">
            Signature copied to clipboard! You can now paste it into Outlook or
            Gmail.
          </p>
        </div>
      )}

      <div
        className={`flex-grow border rounded-lg p-4 overflow-x-auto transition-colors duration-200 ${isDarkMode ? "bg-gray-900 border-gray-700 text-gray-100" : "bg-white border-gray-200 text-gray-900"}`}
      >
        <div className="w-full min-w-max">
          {/* The Actual Signature Template (HTML-based for copying) */}
          <div
            ref={previewRef}
            style={{
              fontFamily:
                '"Gotham", "Helvetica Neue", Helvetica, Arial, sans-serif',
              fontSize: "14px",
              lineHeight: "1.4",
              color: isDarkMode ? "#e5e7eb" : "#333333",
            }}
          >
            {/* Outer wrapper to enforce exact 694px width */}
            <table
              cellPadding="0"
              cellSpacing="0"
              border={0}
              width="694"
              style={{
                width: "694px",
                maxWidth: "694px",
                minWidth: "694px",
                backgroundColor: isDarkMode ? "transparent" : "#ffffff",
                borderCollapse: "collapse",
                tableLayout: "fixed",
              }}
            >
              <tbody>
                <tr>
                  <td>
                    {/* Inner table for the two-column layout */}
                    <table
                      cellPadding="0"
                      cellSpacing="0"
                      border={0}
                      width="100%"
                      style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        tableLayout: "fixed",
                      }}
                    >
                      <tbody>
                        <tr>
                          <td
                            style={{
                              padding: "0",
                              verticalAlign: "top",
                              width: "337px",
                            }}
                          >
                            <div
                              style={{
                                fontSize: "15.3px",
                                fontWeight: "bold",
                                color: isDarkMode ? "#e5e7eb" : "#000000",
                                marginBottom: "20px",
                              }}
                            >
                              {data.fullName || "\u00A0"}
                            </div>
                          </td>
                          <td
                            style={{
                              width: "20px",
                              borderLeft: "2.5px solid #e02b27",
                            }}
                          ></td>
                          <td
                            style={{
                              padding: "0",
                              verticalAlign: "top",
                              width: "337px",
                            }}
                          >
                            <div
                              style={{
                                fontSize: "15.3px",
                                fontWeight: "bold",
                                color: "#7f7f7f",
                                marginBottom: "20px",
                              }}
                            >
                              {data.designation || "\u00A0"}
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td style={{ padding: "0", verticalAlign: "top" }}>
                            <div
                              style={{
                                fontSize: "12px",
                                fontWeight: "bold",
                                marginBottom: "15px",
                                minHeight: "18px",
                              }}
                            >
                              <a
                                href={`mailto:${data.email}`}
                                style={{
                                  color: "#0563C1",
                                  textDecoration: data.email
                                    ? "underline"
                                    : "none",
                                }}
                              >
                                {data.email || "\u00A0"}
                              </a>
                            </div>

                            <div
                              style={{
                                fontSize: "12px",
                                fontWeight: "bold",
                                lineHeight: "1.5",
                              }}
                            >
                              <a
                                href={`https://${data.website1.replace(/^https?:\/\//, "")}`}
                                style={{
                                  color: "#666666",
                                  textDecoration: "none",
                                }}
                              >
                                {data.website1}
                              </a>
                              <br />
                              <a
                                href={`https://${data.website2.replace(/^https?:\/\//, "")}`}
                                style={{
                                  color: "#666666",
                                  textDecoration: "none",
                                }}
                              >
                                {data.website2}
                              </a>
                            </div>

                            <table
                              cellPadding="0"
                              cellSpacing="0"
                              border={0}
                              style={{ marginTop: "20px" }}
                            >
                              <tbody>
                                <tr>
                                  <td style={{ paddingRight: "8px" }}>
                                    <a href="https://www.linkedin.com/company/phamax">
                                      <img
                                        src={`${baseUrl}image001.png`}
                                        alt="LinkedIn"
                                        width="30"
                                        height="29"
                                        style={{
                                          display: "block",
                                          border: "none",
                                        }}
                                      />
                                    </a>
                                  </td>
                                  <td style={{ paddingRight: "8px" }}>
                                    <a href="https://www.youtube.com/channel/UCWS5PQ-pU4nQVQw4B6LgSnw">
                                      <img
                                        src={`${baseUrl}image002.png`}
                                        alt="YouTube"
                                        width="30"
                                        height="29"
                                        style={{
                                          display: "block",
                                          border: "none",
                                        }}
                                      />
                                    </a>
                                  </td>
                                  <td style={{ paddingRight: "8px" }}>
                                    <a href="https://www.facebook.com/phamaxAG/">
                                      <img
                                        src={`${baseUrl}image003.png`}
                                        alt="Facebook"
                                        width="30"
                                        height="29"
                                        style={{
                                          display: "block",
                                          border: "none",
                                        }}
                                      />
                                    </a>
                                  </td>
                                  <td>
                                    <a href="https://ariya.ai/">
                                      <img
                                        src={`${baseUrl}image004.png`}
                                        alt="Ariya"
                                        width="30"
                                        height="29"
                                        style={{
                                          display: "block",
                                          border: "none",
                                        }}
                                      />
                                    </a>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                          <td
                            style={{
                              width: "20px",
                              borderLeft: "2.5px solid #e02b27",
                            }}
                          ></td>
                          <td style={{ padding: "0", verticalAlign: "top" }}>
                            <div
                              style={{
                                fontSize: "12px",
                                lineHeight: "1.5",
                                marginBottom: "15px",
                              }}
                            >
                              {data.templateType === "International" && (
                                <>
                                  <span style={{ color: "#666666" }}>Phone: </span>
                                  <span style={{ color: "#7F7F7F" }}>
                                    {data.phone || "\u00A0"}
                                  </span>
                                  <br />
                                </>
                              )}
                              <span style={{ color: "#666666" }}>Mobile: </span>
                              <span style={{ color: "#7F7F7F" }}>
                                {data.mobile || "\u00A0"}
                              </span>
                              <br />
                              <span style={{ color: "#666666" }}>Teams: </span>
                              <a
                                href={`mailto:${data.teams}`}
                                style={{
                                  color: isDarkMode ? "#e5e7eb" : "#000000",
                                  textDecoration: data.teams
                                    ? "underline"
                                    : "none",
                                  wordBreak: "break-all",
                                }}
                              >
                                {data.teams || "\u00A0"}
                              </a>
                            </div>

                            <div
                              style={{
                                fontSize: "12px",
                                lineHeight: "1.5",
                                color: "#7F7F7F",
                              }}
                            >
                              {data.templateType === "International" ? (
                                <>
                                  phamax AG <span style={{ color: "#666666" }}>|</span>{" "}
                                  Bahnhofstrasse 29 <span style={{ color: "#666666" }}>|</span>{" "}
                                  6300 Zug <span style={{ color: "#666666" }}>|</span>{" "}
                                  Switzerland
                                </>
                              ) : (
                                <>
                                  PURVA PREMIERE{" "}
                                  <span style={{ color: "#666666" }}>|</span> COWRKS{" "}
                                  <span style={{ color: "#666666" }}>|</span> 135/1{" "}
                                  <span style={{ color: "#666666" }}>|</span>{" "}
                                  Residency Rd{" "}
                                  <span style={{ color: "#666666" }}>|</span> Ward
                                  No.76 <span style={{ color: "#666666" }}>|</span>
                                  Ashok Nagar{" "}
                                  <span style={{ color: "#666666" }}>|</span>{" "}
                                  Bengaluru{" "}
                                  <span style={{ color: "#666666" }}>|</span>{" "}
                                  Karnataka 560025
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style={{ paddingTop: "20px" }}>
                    <a href="https://phamax.ch/">
                      <img
                        src={`${baseUrl}image005.png`}
                        alt="Phamax Banner"
                        width="694"
                        style={{
                          width: "694px",
                          maxWidth: "694px",
                          height: "auto",
                          display: "block",
                          border: "none",
                        }}
                      />
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style={{ paddingTop: "15px" }}>
                    <div
                      style={{
                        fontSize: "10px",
                        color: "#999999",
                        lineHeight: "1.5",
                        fontFamily:
                          '"Gotham", "Helvetica Neue", Helvetica, Arial, sans-serif',
                      }}
                    >
                      CONFIDENTIALITY NOTICE:
                      <br />
                      PLEASE READ: This electronic message, including its
                      attachments, is CONFIDENTIAL and contains PROPRIETARY or
                      LEGALLY PRIVILEGED or PROTECTED information. It is
                      intended solely for the authorized recipient of the
                      sender. The use, disclosure, copying or distribution of
                      this message or information included in it is unauthorized
                      and strictly forbidden if you are not the intended
                      recipient. Immediately notify the sender after deleting
                      the message (including all copies on your computer, mobile
                      device etc.) if you received the message in error. We
                      monitor electronic communications as permitted by law to
                      ensure compliance with our legal and regulatory
                      obligations and internal policies. We also collect email
                      traffic headers to analyze patterns in network traffic and
                      manage client relationships.{" "}
                      <a
                        href="https://phamax.ch/privacy-policy/"
                        style={{ color: "#0563C1", textDecoration: "none" }}
                      >
                        VISIT OUR POLICY PAGE
                      </a>{" "}
                      for more information. Thank you for your cooperation and
                      understanding.
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
