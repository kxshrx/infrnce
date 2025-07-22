"use client";

import { useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import {
  ArrowLeftRight,
  Wand2,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock,
} from "lucide-react";
import Link from "next/link";

// New PipelineJourney component for the results display
const PipelineJourney = ({ result }) => {
  if (!result || !result.journey) return null;

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "classified":
      case "matched":
        return <CheckCircle2 className="h-4 w-4 text-teal-600" />;
      case "low confidence":
        return <AlertTriangle className="h-4 w-4 text-amber-600" />;
      case "skipped":
      case "not required":
        return <XCircle className="h-4 w-4 text-gray-500" />;
      default:
        return <XCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColorClass = (status) => {
    switch (status.toLowerCase()) {
      case "classified":
      case "matched":
        return "text-teal-700 bg-teal-50 border-l-teal-300";
      case "low confidence":
        return "text-amber-700 bg-amber-50 border-l-amber-300";
      case "skipped":
      case "not required":
        return "text-gray-600 bg-gray-50 border-l-gray-300";
      default:
        return "text-gray-600 bg-gray-50 border-l-gray-300";
    }
  };

  return (
    <div className="mt-6 space-y-4">
      <div className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-primary" />
        Classification Pipeline Journey
      </div>

      <div className="space-y-3">
        {result.journey.map((step, index) => (
          <div
            key={index}
            className={`flex items-start gap-3 p-3 rounded-lg border-l-4 ${getStatusColorClass(
              step.status
            )}`}
          >
            <div className="flex-shrink-0 mt-0.5">
              {getStatusIcon(step.status)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">{step.stage}</h4>
                <span className="text-xs font-medium uppercase tracking-wide">
                  {step.status}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {step.details}
              </p>
            </div>
            {/* Connecting line for all but the last item */}
            {index < result.journey.length - 1 && (
              <div
                className="absolute left-[25px] mt-8 w-px h-6 bg-border"
                style={{ marginLeft: "13px" }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Final Result Summary */}
      <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-primary">
              Final Classification: {result.final_category}
            </h3>
            <p className="text-sm text-muted-foreground">
              Processed via {result.pipeline_stage} stage
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-3 w-3" />
              {result.processing_time_ms}ms
            </div>
            <div className="text-xs text-muted-foreground">Response Time</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function EnginePage() {
  const [logText, setLogText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [classificationResult, setClassificationResult] = useState(null);
  const [error, setError] = useState(null);

  // Read the API URL from environment variables, with a fallback for local development
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

  const handleGetRandomLog = async () => {
    try {
      setError(null);
      // Since there's no random log endpoint, we'll generate a synthetic log instead
      const response = await fetch(`${apiUrl}/api/generate`, {
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
      const response = await fetch(`${apiUrl}/api/generate`, {
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

      const response = await fetch(`${apiUrl}/api/classify`, {
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
        "Demo mode: Using mock classification result. Please ensure the API is running for live classification."
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

      {/* Unified Workflow Card */}
      <Card className="border-primary/20 shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>Classification Workflow</CardTitle>
              <CardDescription>
                Enter a log message or use the helper actions to get started
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Command Bar with Textarea and Helper Actions */}
          <TooltipProvider>
            <div className="relative">
              <Textarea
                placeholder="Enter your log message here..."
                value={logText}
                onChange={(e) => setLogText(e.target.value)}
                className="min-h-32 pr-20 resize-none"
                disabled={isLoading}
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
                      disabled={isLoading}
                    >
                      <ArrowLeftRight className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Get Random Log from Dataset</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleGenerateSyntheticLog}
                      className="h-8 w-8"
                      disabled={isLoading}
                    >
                      <Wand2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Generate a New Log with AI</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </TooltipProvider>

          {/* Pipeline Journey Results Display */}
          {classificationResult && (
            <PipelineJourney result={classificationResult} />
          )}
        </CardContent>

        {/* Integrated Action Button in Footer */}
        <CardFooter>
          <Button
            onClick={handleClassifyLog}
            disabled={isLoading || !logText.trim()}
            className="w-full h-12 text-lg font-semibold bg-primary hover:bg-primary/90"
            size="lg"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Classifying...
              </div>
            ) : (
              "Run Classification"
            )}
          </Button>
        </CardFooter>
      </Card>

      {/* Navigation Link */}
      {classificationResult && (
        <div className="text-center mt-8">
          <Button
            variant="outline"
            className="border-primary/20 hover:bg-primary/5"
            asChild
          >
            <Link href="/dashboard">View Performance Dashboard</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
