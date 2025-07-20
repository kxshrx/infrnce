"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Cpu, Zap, Target, Database, Sparkles } from "lucide-react";

export default function Home() {
  const [logInput, setLogInput] = useState("");
  const [classificationResult, setClassificationResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRandomLog = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Since /api/random-log doesn't exist, use fallback directly
      const randomSamples = [
        "INFO nova.compute.manager [None req-ac9f5721-5c52-4ec3-ba8a-e494d9780d53 None None] [instance: 269c2e5c-24aa-4d93-a9c1-c309902ef963] During sync_power_state the instance has a pending task (spawning). Skip.",
        "WARNING nova.virt.libvirt.driver [req-12345] Instance boot timeout detected after 300 seconds",
        "ERROR nova.api.openstack.compute [req-error123] File not found: /var/lib/nova/instances/test/disk",
        "CRITICAL nova.scheduler.filter_scheduler [req-67890] Complex multi-tenant resource allocation failure with cascading dependency violations in availability zone us-east-1a",
        "INFO nova.network.neutronv2.api [req-net456] Successfully created port for instance deployment",
      ];

      const randomLog =
        randomSamples[Math.floor(Math.random() * randomSamples.length)];
      setLogInput(randomLog);
      setClassificationResult(null);
    } catch (err) {
      setError("Failed to fetch random log");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateSynthetic = async () => {
    setIsLoading(true);
    setError(null);
    try {
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
      setLogInput(data.synthetic_log);
      setClassificationResult(null);
    } catch (err) {
      setError(
        "Failed to generate synthetic log. Make sure the backend is running."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearInput = () => {
    setLogInput("");
    setClassificationResult(null);
    setError(null);
  };

  const handleClassify = async () => {
    if (!logInput.trim()) {
      setError("Please enter a log message to classify");
      return;
    }

    setIsLoading(true);
    setError(null);
    setClassificationResult(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/classify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          log_message: logInput,
        }),
      });

      if (!response.ok) {
        throw new Error("Classification failed");
      }

      const result = await response.json();
      setClassificationResult(result);
    } catch (err) {
      setError(
        "Classification failed. Make sure the backend is running on localhost:8000."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const getStageIcon = (stage) => {
    switch (stage.toLowerCase()) {
      case "regex":
        return <Zap className="h-4 w-4 text-teal-600" />;
      case "bert":
        return <Cpu className="h-4 w-4 text-teal-600" />;
      case "llm":
        return <Target className="h-4 w-4 text-teal-600" />;
      default:
        return <div className="h-4 w-4 rounded-full bg-teal-200" />;
    }
  };

  const getStageName = (stage) => {
    switch (stage.toLowerCase()) {
      case "regex":
        return "Regex Engine";
      case "bert":
        return "BERT Model";
      case "llm":
        return "LLM Fallback";
      default:
        return stage;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50/30 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Main Title */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-teal-700">
            The Infrnce Classification Engine
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            An Intelligent Classification Engine for Infrastructure Logs
          </p>
        </div>

        {/* Input Section */}
        <Card className="shadow-lg border-teal-100">
          <CardContent className="p-6">
            <Tabs defaultValue="manual" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 bg-teal-50">
                <TabsTrigger
                  value="manual"
                  className="data-[state=active]:bg-teal-600 data-[state=active]:text-white"
                >
                  Manual Input
                </TabsTrigger>
                <TabsTrigger
                  value="dataset"
                  className="data-[state=active]:bg-teal-600 data-[state=active]:text-white"
                >
                  From Dataset
                </TabsTrigger>
                <TabsTrigger
                  value="generate"
                  className="data-[state=active]:bg-teal-600 data-[state=active]:text-white"
                >
                  Generate with AI
                </TabsTrigger>
              </TabsList>

              <TabsContent value="manual" className="space-y-4">
                <Textarea
                  placeholder="Enter your OpenStack log message here..."
                  value={logInput}
                  onChange={(e) => setLogInput(e.target.value)}
                  className="min-h-32 resize-none border-teal-200 focus:border-teal-400"
                />
                <Button
                  variant="ghost"
                  onClick={handleClearInput}
                  disabled={isLoading}
                  className="w-full text-teal-600 hover:bg-teal-50"
                >
                  Clear Input
                </Button>
              </TabsContent>

              <TabsContent value="dataset" className="space-y-4">
                <div className="text-center p-8 border-2 border-dashed border-teal-200 rounded-lg">
                  <Database className="h-12 w-12 text-teal-400 mx-auto mb-4" />
                  <p className="text-slate-600 mb-4">
                    Load a random log from our existing dataset
                  </p>
                  <Button
                    onClick={handleRandomLog}
                    disabled={isLoading}
                    className="bg-teal-600 hover:bg-teal-700"
                  >
                    Get Random Existing Log
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="generate" className="space-y-4">
                <div className="text-center p-8 border-2 border-dashed border-teal-200 rounded-lg">
                  <Sparkles className="h-12 w-12 text-teal-400 mx-auto mb-4" />
                  <p className="text-slate-600 mb-4">
                    Generate a new synthetic log using AI
                  </p>
                  <Button
                    onClick={handleGenerateSynthetic}
                    disabled={isLoading}
                    className="bg-teal-600 hover:bg-teal-700"
                  >
                    Generate Synthetic Log
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Classification Button */}
        <div className="text-center">
          <Button
            onClick={handleClassify}
            disabled={isLoading || !logInput.trim()}
            className="w-full md:w-auto h-14 px-12 text-lg font-semibold bg-teal-600 hover:bg-teal-700"
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              "Run Classification"
            )}
          </Button>
        </div>

        {/* Error Display */}
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Results Section */}
        {classificationResult && (
          <div className="space-y-4">
            <Alert className="border-teal-200 bg-teal-50/50">
              <div className="flex items-center gap-3">
                {getStageIcon(classificationResult.pipeline_stage)}
                <div>
                  <div className="font-semibold text-lg text-teal-800">
                    {classificationResult.final_category}
                  </div>
                  <AlertDescription className="text-teal-700">
                    Classified by{" "}
                    {getStageName(classificationResult.pipeline_stage)}
                    {classificationResult.processing_time_ms && (
                      <> in {classificationResult.processing_time_ms}ms</>
                    )}
                    . Efficient routing applied.
                  </AlertDescription>
                </div>
              </div>
            </Alert>

            <div className="text-center">
              <Link href="/dashboard">
                <Button
                  variant="outline"
                  className="border-teal-600 text-teal-600 hover:bg-teal-50"
                >
                  View Performance Dashboard
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
