"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Zap, Cpu, Target, BarChart3, Clock, CheckCircle } from "lucide-react";

export default function DeepDive() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
            Project Deep Dive
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Explore the architecture, performance metrics, and technology behind
            our hybrid intelligent log classification system.
          </p>
        </div>

        {/* Project Architecture Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <BarChart3 className="h-6 w-6 text-primary" />
              Hybrid Pipeline Architecture
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Architecture Diagram Placeholder */}
            <div className="w-full h-64 bg-gradient-to-r from-teal-100 to-blue-100 rounded-lg flex items-center justify-center border-2 border-dashed border-teal-300">
              <div className="text-center">
                <BarChart3 className="h-16 w-16 text-teal-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-teal-800">
                  6-Stage Pipeline Architecture
                </h3>
                <p className="text-teal-600">
                  Data Preparation → Clustering → Regex → BERT → LLM →
                  Integration
                </p>
              </div>
            </div>

            <div className="prose max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                The system implements intelligent routing logic that directs
                computational resources based on log complexity. Large clusters
                (&gt;3,000 similar logs) are processed with fast regex patterns,
                medium clusters (1,000-3,000 logs) utilize BERT deep learning
                for semantic understanding, and small clusters (&lt;1,000 logs)
                leverage advanced LLM reasoning for complex edge cases. This
                approach optimizes both accuracy and computational efficiency by
                using the most appropriate classification method for each log
                type.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Performance Dashboard */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <CheckCircle className="h-6 w-6 text-primary" />
              Key Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Overall Classification Coverage */}
              <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg border">
                <div className="text-4xl font-bold text-emerald-600 mb-2">
                  92.7%
                </div>
                <div className="text-sm font-medium text-emerald-800 mb-1">
                  Overall Classification Coverage
                </div>
                <div className="text-xs text-muted-foreground">
                  54,646 total logs processed
                </div>
              </div>

              {/* Classification Accuracy */}
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  94.3%
                </div>
                <div className="text-sm font-medium text-blue-800 mb-1">
                  Classification Accuracy
                </div>
                <div className="text-xs text-muted-foreground">
                  Based on validation sample
                </div>
              </div>

              {/* Processing Speed */}
              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border">
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  ~260
                </div>
                <div className="text-sm font-medium text-purple-800 mb-1">
                  Logs/Second
                </div>
                <div className="text-xs text-muted-foreground">
                  End-to-end throughput
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technology Breakdown */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Cpu className="h-6 w-6 text-primary" />
              How It Works: A Look Inside Each Stage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {/* Stage 1: Regex Engine */}
              <AccordionItem value="regex">
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-3">
                    <Zap className="h-5 w-5 text-yellow-600" />
                    <div>
                      <div className="font-semibold">
                        Stage 1: The Regex Engine
                      </div>
                      <div className="text-sm text-muted-foreground">
                        42% of logs processed
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pl-8 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">
                        Performance Metrics
                      </h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Processing Speed: ~1,200 logs/second</li>
                        <li>• Average Latency: 0.83ms per log</li>
                        <li>• Classification Precision: 99.7%</li>
                        <li>• Memory Usage: 128MB</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Key Capabilities</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• 27 optimized regex patterns</li>
                        <li>• Deterministic pattern matching</li>
                        <li>• Handles routine operations efficiently</li>
                        <li>• Extremely low computational cost</li>
                      </ul>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    The regex engine provides lightning-fast classification for
                    common, predictable log patterns. It targets high-frequency
                    logs from large clusters (&gt;3,000 similar logs) using
                    optimized regular expressions for LibVirt driver operations,
                    compute manager activities, and system operations.
                  </p>
                </AccordionContent>
              </AccordionItem>

              {/* Stage 2: BERT Model */}
              <AccordionItem value="bert">
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-3">
                    <Cpu className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-semibold">
                        Stage 2: The BERT Model
                      </div>
                      <div className="text-sm text-muted-foreground">
                        26% of logs processed
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pl-8 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Model Architecture</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• DistilBERT-base-uncased</li>
                        <li>• 66 million parameters</li>
                        <li>• 6 semantic categories</li>
                        <li>• 0.7 confidence threshold</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">
                        Performance Results
                      </h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Validation Accuracy: 95.3%</li>
                        <li>• Processing Speed: ~75 logs/second</li>
                        <li>• F1 Score: 0.943</li>
                        <li>• High confidence rate: 82%</li>
                      </ul>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    The BERT model handles medium-complexity logs that escape
                    regex classification but have sufficient training examples.
                    It uses fine-tuned DistilBERT for semantic understanding of
                    log patterns, handling syntactic variations while
                    maintaining high accuracy through controlled training with
                    early stopping at 92.5% validation accuracy.
                  </p>
                </AccordionContent>
              </AccordionItem>

              {/* Stage 3: LLM Fallback */}
              <AccordionItem value="llm">
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-3">
                    <Target className="h-5 w-5 text-purple-600" />
                    <div>
                      <div className="font-semibold">
                        Stage 3: The LLM Fallback
                      </div>
                      <div className="text-sm text-muted-foreground">
                        21% of logs processed
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pl-8 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Technology Stack</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• LLaMA 3.1 (8B parameters)</li>
                        <li>• LangChain framework</li>
                        <li>• Groq API integration</li>
                        <li>• 0.65 confidence threshold</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">
                        Advanced Capabilities
                      </h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• 11 enhanced categories</li>
                        <li>• Semantic understanding</li>
                        <li>• Error subcategorization</li>
                        <li>• 79% average confidence</li>
                      </ul>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    The LLM fallback stage handles rare, complex, and edge-case
                    log patterns that require advanced semantic reasoning. Using
                    strategic sampling of 2,000 logs from unclassified sets, it
                    provides detailed subcategorization including
                    Boot_Timeout_Errors, Network_Connection_Errors,
                    File_System_Errors, Configuration_Errors,
                    Resource_Allocation_Errors, and
                    Service_Communication_Errors.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* Resource Utilization */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Clock className="h-6 w-6 text-primary" />
              Resource Utilization & Cost Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-4">Computational Resources</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                    <span className="text-sm font-medium">Regex Stage CPU</span>
                    <Badge variant="secondary">12% avg</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm font-medium">BERT Stage CPU</span>
                    <Badge variant="secondary">78% avg</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="text-sm font-medium">LLM Stage CPU</span>
                    <Badge variant="secondary">22% avg</Badge>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-4">
                  Cost Analysis (per 1,000 logs)
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-sm font-medium">
                      Regex Processing
                    </span>
                    <Badge variant="outline" className="text-green-700">
                      $0.00
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm font-medium">BERT Processing</span>
                    <Badge variant="outline" className="text-blue-700">
                      $0.03
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="text-sm font-medium">LLM Processing</span>
                    <Badge variant="outline" className="text-purple-700">
                      $0.23
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
