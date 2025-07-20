"use client";

import { useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Textarea } from "../../components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/tooltip";
import { Dice5, Sparkles } from "lucide-react";
import Link from "next/link";
import ClassificationJourney from "../../components/classification-journey";

export default function EnginePage() {
  const [logText, setLogText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [classificationResult, setClassificationResult] = useState(null);
  const [error, setError] = useState(null);

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
    } catch (err) {
      // Fallback to mock data for demo purposes
      const mockLogs = [
        "ERROR 2024-01-15 14:23:01 [DatabaseConnection] Connection timeout after 30 seconds to database server mysql://prod-db:3306",
        "WARN 2024-01-15 14:23:02 [AuthService] Failed login attempt for user admin@company.com from IP 192.168.1.100",
        "INFO 2024-01-15 14:23:03 [APIGateway] Rate limit exceeded for endpoint /api/users - 1000 requests in 60 seconds",
      ];
      const randomLog = mockLogs[Math.floor(Math.random() * mockLogs.length)];
      setLogText(randomLog);
      setError(
        "Demo mode: Using sample log data. Please ensure the API is running for live data."
      );
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
    } catch (err) {
      // Fallback to mock synthetic log for demo purposes
      const mockSyntheticLogs = [
        "ERROR 2024-01-15 09:15:42 [LoadBalancer] Upstream server nginx-web-01:8080 failed health check - response time exceeded 5000ms",
        "CRITICAL 2024-01-15 09:15:43 [KubernetesController] Pod web-deployment-7b4f9d8c6-xk2m4 in namespace production failed to start - ImagePullBackOff",
        "WARN 2024-01-15 09:15:44 [RedisCluster] Memory usage at 85% capacity on node redis-cluster-0 - consider scaling up",
      ];
      const randomSyntheticLog =
        mockSyntheticLogs[Math.floor(Math.random() * mockSyntheticLogs.length)];
      setLogText(randomSyntheticLog);
      setError(
        "Demo mode: Using generated sample log. Please ensure the API is running for AI-generated logs."
      );
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

  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
          The Infrnce Classification Engine
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Intelligent real-time classification engine for infrastructure logs
          with multi-tiered AI processing
        </p>
      </div>

      {/* Command Bar Card */}
      <Card className="mb-8 border-primary/20">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>Classification Engine</CardTitle>
              <CardDescription>
                Enter a log message or use the helper actions to get started
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <TooltipProvider>
            <div className="relative">
              <Textarea
                placeholder="Enter your log message here..."
                value={logText}
                onChange={(e) => setLogText(e.target.value)}
                className="min-h-32 pr-20"
              />
              {/* Helper Action Icons */}
              <div className="absolute top-3 right-3 flex space-x-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleGetRandomLog}
                      className="h-8 w-8"
                    >
                      <Dice5 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Load a random log from the dataset</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleGenerateSyntheticLog}
                      className="h-8 w-8"
                    >
                      <Sparkles className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Generate a synthetic log using AI</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </TooltipProvider>
        </CardContent>
      </Card>

      {/* Primary Action */}
      <div className="text-center mb-8">
        <Button
          onClick={handleClassifyLog}
          disabled={isLoading || !logText.trim()}
          className="px-12 py-4 text-lg h-14 bg-primary hover:bg-primary/90 font-semibold"
          size="lg"
        >
          {isLoading ? "Classifying..." : "Run Classification"}
        </Button>
      </div>

      {/* Error Display */}
      {error && (
        <Alert
          className="mb-6 border-amber-200 bg-amber-50 text-amber-900"
          variant="destructive"
        >
          <AlertTitle className="text-amber-900">Demo Mode</AlertTitle>
          <AlertDescription className="text-amber-800">
            {error}
          </AlertDescription>
        </Alert>
      )}

      {/* Results Display */}
      {classificationResult && (
        <div className="space-y-6">
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-primary/20 rounded-lg">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-primary text-xl">
                    {classificationResult.final_category}
                  </CardTitle>
                  <CardDescription>
                    Classified by the {classificationResult.pipeline_stage} in{" "}
                    {classificationResult.processing_time_ms}ms
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-background/50 rounded-lg p-4 backdrop-blur-sm">
                <ClassificationJourney journey={classificationResult.journey} />
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button
              variant="outline"
              className="border-primary/20 hover:bg-primary/5"
              asChild
            >
              <Link href="/dashboard">View Performance Dashboard</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
