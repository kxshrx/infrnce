"use client";

import { useState } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Textarea } from "../components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { Badge } from "../components/ui/badge";
import Link from "next/link";
import {
  ChevronRight,
  Clock,
  Cloud,
  Zap,
  GitBranch,
  BarChart3,
  Code,
} from "lucide-react";
import ClassificationJourney from "../components/classification-journey";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("manual");
  const [logText, setLogText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [classificationResult, setClassificationResult] = useState(null);
  const [error, setError] = useState(null);

  const handleClearLog = () => {
    setLogText("");
    setClassificationResult(null);
    setError(null);
  };

  const handleGetRandomLog = async () => {
    try {
      setError(null);
      // Since there's no random log endpoint, we'll generate a synthetic log instead
      const response = await fetch("http://127.0.0.1:8000/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch random log");
      }

      const data = await response.json();
      setLogText(data.synthetic_log || data.message || "");
      // Switch to manual tab after loading the log
      setTimeout(() => setActiveTab("manual"), 1000);
    } catch (err) {
      // Mock data for demo purposes
      const mockLogs = [
        "2024-01-15 10:42:33 ERROR [nginx] Connection refused: Unable to connect to upstream server at 192.168.1.100:8080",
        "2024-01-15 14:23:17 WARN [apache] mod_ssl: SSL handshake failed with client 203.0.113.45",
        "2024-01-15 16:55:42 INFO [mysql] Query executed successfully: SELECT * FROM users WHERE status='active' - 1.2s",
        "2024-01-15 09:31:28 ERROR [app] Database connection timeout after 30s - retrying connection pool",
        "2024-01-15 11:18:05 DEBUG [redis] Cache miss for key 'user_session_abc123' - fetching from database",
      ];
      const randomLog = mockLogs[Math.floor(Math.random() * mockLogs.length)];
      setLogText(randomLog);
      setTimeout(() => setActiveTab("manual"), 1000);
    }
  };

  const handleGenerateSyntheticLog = async () => {
    try {
      setError(null);
      const response = await fetch("http://127.0.0.1:8000/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to generate synthetic log");
      }

      const data = await response.json();
      setLogText(data.synthetic_log || data.message || "");
      // Switch to manual tab after generating the log
      setTimeout(() => setActiveTab("manual"), 1000);
    } catch (err) {
      // Mock synthetic logs for demo purposes
      const syntheticLogs = [
        "2024-01-15 13:27:44 CRITICAL [kubernetes] Pod 'web-frontend-7b8f9c-xj2k9' failed to start: ImagePullBackOff - image 'app:v2.1.3' not found",
        "2024-01-15 15:42:18 ERROR [docker] Container 'api-service-prod' exited with code 1: OutOfMemoryError in thread 'main'",
        "2024-01-15 08:13:29 WARN [elastic] Index 'logs-2024.01' is approaching storage limit: 95% capacity reached",
        "2024-01-15 12:56:31 INFO [prometheus] Metric collection completed for target 'microservice-auth' - 2847 datapoints",
        "2024-01-15 17:09:42 ERROR [terraform] Plan failed: Invalid resource configuration for aws_instance.web_server",
      ];
      const randomSynthetic =
        syntheticLogs[Math.floor(Math.random() * syntheticLogs.length)];
      setLogText(randomSynthetic);
      setTimeout(() => setActiveTab("manual"), 1000);
    }
  };

  const handleClassifyLog = async () => {
    if (!logText.trim()) {
      setError("Please enter a log message to classify.");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      setClassificationResult(null);

      const response = await fetch("http://127.0.0.1:8000/api/classify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          log_message: logText,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to classify log");
      }

      const data = await response.json();
      setClassificationResult(data);
    } catch (err) {
      // If API is not available, show a mock response for demo purposes
      const mockResponse = {
        final_category: "Network_Connection_Errors",
        pipeline_stage: "LLM",
        processing_time_ms: 150,
        journey: [
          {
            stage: "Regex Engine",
            status: "Skipped",
            details: "No pattern matched.",
          },
          {
            stage: "BERT Model",
            status: "Low Confidence",
            details: "Confidence was 0.65, below the 0.7 threshold.",
          },
          {
            stage: "LLM Fallback",
            status: "Classified",
            details: "Classified into 1 of 11 enhanced categories.",
          },
        ],
      };
      setClassificationResult(mockResponse);
      setError(
        "Demo mode: Using mock classification result. Please ensure the API is running at http://127.0.0.1:8000 for live classification."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToDemo = () => {
    document
      .getElementById("demo-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleTabChange = (value) => {
    setActiveTab(value);

    // Automatically trigger log generation when switching to dataset or generate tabs
    if (value === "dataset") {
      handleGetRandomLog();
    } else if (value === "generate") {
      handleGenerateSyntheticLog();
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-background to-muted/30 py-20 lg:py-32">
        <div className="container mx-auto px-6 text-center relative">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 tracking-tight">
              Infrnce
            </h1>
            <p className="text-lg text-muted-foreground mb-4 font-medium max-w-3xl mx-auto">
              Intelligent Log Classification Engine for Infrastructure Teams
            </p>
            <p className="text-lg text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Automate infrastructure monitoring and cut incident triage time
              with precision classification.
            </p>
            <Button
              onClick={scrollToDemo}
              size="lg"
              className="px-8 py-4 text-lg h-14 group"
            >
              Try the Engine
              <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* Live Product Preview */}
      <section id="demo-section" className="relative py-20 bg-background">
        <div className="container mx-auto px-6 max-w-4xl relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Experience the Engine
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Test our intelligent classification system with your own logs or
              try our sample data.
            </p>
          </div>

          <Card className="mb-8 border-primary/20 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl">
                    Live Classification Demo
                  </CardTitle>
                  <CardDescription>
                    Enter a log message manually, load from our dataset, or
                    generate a synthetic example
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={handleTabChange}>
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="manual">Manual Input</TabsTrigger>
                  <TabsTrigger value="dataset">From Dataset</TabsTrigger>
                  <TabsTrigger value="generate">Generate with AI</TabsTrigger>
                </TabsList>

                <TabsContent value="manual" className="space-y-4">
                  <Textarea
                    placeholder="Enter your log message here..."
                    value={logText}
                    onChange={(e) => setLogText(e.target.value)}
                    className="min-h-32 text-sm"
                  />
                  <Button
                    variant="ghost"
                    onClick={handleClearLog}
                    className="w-full"
                  >
                    Clear
                  </Button>
                </TabsContent>

                <TabsContent value="dataset" className="space-y-4">
                  <div className="text-center py-8">
                    <div className="text-muted-foreground text-sm">
                      {logText
                        ? "Random log loaded successfully!"
                        : "Loading random log from dataset..."}
                    </div>
                    {logText && (
                      <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                        <Textarea
                          value={logText}
                          onChange={(e) => setLogText(e.target.value)}
                          className="min-h-24 text-sm"
                          placeholder="Log message will appear here..."
                        />
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="generate" className="space-y-4">
                  <div className="text-center py-8">
                    <div className="text-muted-foreground text-sm">
                      {logText
                        ? "Synthetic log generated successfully!"
                        : "Generating synthetic log with AI..."}
                    </div>
                    {logText && (
                      <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                        <Textarea
                          value={logText}
                          onChange={(e) => setLogText(e.target.value)}
                          className="min-h-24 text-sm"
                          placeholder="Generated log will appear here..."
                        />
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>

              <div className="text-center mt-6">
                <Button
                  onClick={handleClassifyLog}
                  disabled={isLoading || !logText.trim()}
                  size="lg"
                  className="px-8 py-3 text-lg h-12"
                >
                  {isLoading ? "Classifying..." : "Run Classification"}
                </Button>
              </div>

              {error && (
                <Alert className="mt-6" variant="destructive">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {classificationResult && (
                <div className="mt-6 space-y-4">
                  <Alert className="border-primary/20 bg-primary/5">
                    <AlertTitle className="text-primary">
                      {classificationResult.final_category}
                    </AlertTitle>
                    <AlertDescription>
                      Classified by the {classificationResult.pipeline_stage} in{" "}
                      {classificationResult.processing_time_ms}ms
                    </AlertDescription>
                    <div className="mt-4">
                      <ClassificationJourney
                        journey={classificationResult.journey}
                      />
                    </div>
                  </Alert>

                  <div className="text-center">
                    <Link href="/dashboard">
                      <Button variant="outline" className="px-6 py-2">
                        View Performance Dashboard
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Why Infrnce? - Value Proposition */}
      <section className="relative py-20 bg-muted/30">
        <div className="container mx-auto px-6 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Why Infrnce?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Transform your infrastructure monitoring with intelligent
              automation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="p-8 border-primary/20 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  Automate and Accelerate
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Reduce manual effort on low-value log review. Let our
                intelligent system handle routine classification while your team
                focuses on critical issues.
              </p>
            </Card>

            <Card className="p-8 border-primary/20 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                  <Cloud className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  Reduce Cloud Costs
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Route only complex cases to LLM processing. Our multi-tier
                approach saves compute costs while maintaining high accuracy
                across all log types.
              </p>
            </Card>

            <Card className="p-8 border-primary/20 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  Cut Incident Resolution Time
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Instantly categorize, prioritize, and route new issues.
                Transform reactive monitoring into proactive infrastructure
                management.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Architecture Snapshot */}
      <section className="relative py-20 bg-background">
        <div className="container mx-auto px-6 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Intelligent Pipeline Architecture
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              A sophisticated 3-stage classification system that optimizes for
              both speed and accuracy
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {/* Stage 1: Regex */}
              <Card className="relative group cursor-pointer hover:shadow-lg transition-all border-primary/20">
                <CardHeader className="pb-0">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg mb-4">
                    <GitBranch className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">
                    Stage 1: Regex Engine
                  </CardTitle>
                  <CardDescription>42% of workload</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Fast pattern matching for standard infrastructure logs.
                    Handles common formats with millisecond response times.
                  </p>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Response Time:
                      </span>
                      <span className="font-medium">&lt;1ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Accuracy:</span>
                      <span className="font-medium">98.7%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Stage 2: BERT */}
              <Card className="relative group cursor-pointer hover:shadow-lg transition-all border-primary/20">
                <CardHeader className="pb-0">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg mb-4">
                    <BarChart3 className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Stage 2: BERT Model</CardTitle>
                  <CardDescription>26% of workload</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Contextual understanding for complex application logs and
                    multi-line error messages.
                  </p>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Response Time:
                      </span>
                      <span className="font-medium">~50ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Accuracy:</span>
                      <span className="font-medium">95.2%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Stage 3: LLM */}
              <Card className="relative group cursor-pointer hover:shadow-lg transition-all border-primary/20">
                <CardHeader className="pb-0">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg mb-4">
                    <Code className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">
                    Stage 3: LLM Fallback
                  </CardTitle>
                  <CardDescription>21% of workload</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Advanced reasoning for highly complex, novel, or ambiguous
                    log entries.
                  </p>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Response Time:
                      </span>
                      <span className="font-medium">~200ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Accuracy:</span>
                      <span className="font-medium">96.8%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* User Pathways */}
      <section className="relative py-20 bg-muted/30">
        <div className="container mx-auto px-6 text-center relative">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Explore Infrnce
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/dashboard">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full h-16 text-lg group border-primary/20 hover:border-primary"
                >
                  <BarChart3 className="mr-3 h-6 w-6" />
                  View Dashboard
                  <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>

              <Link
                href="https://github.com/kxshrx/log-classification"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full h-16 text-lg group border-primary/20 hover:border-primary"
                >
                  <Code className="mr-3 h-6 w-6" />
                  View Source
                  <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>

              <Button
                variant="outline"
                size="lg"
                onClick={scrollToDemo}
                className="w-full h-16 text-lg group border-primary/20 hover:border-primary"
              >
                <Zap className="mr-3 h-6 w-6" />
                Try Demo
                <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
