"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  Zap,
  Cpu,
  Target,
  Clock,
  CheckCircle,
  TrendingUp,
  DollarSign,
  Activity,
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50/30 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-teal-700">
            Performance Dashboard
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Real-world metrics and architectural insights from the Infrnce
            classification engine.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Intelligent Routing Architecture Card */}
          <Card className="shadow-lg border-teal-100 md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl text-teal-700">
                <BarChart3 className="h-6 w-6" />
                Intelligent Routing Architecture
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Architecture Diagram Placeholder */}
              <div className="w-full h-64 bg-gradient-to-r from-teal-100 to-teal-200 rounded-lg flex items-center justify-center border-2 border-dashed border-teal-300">
                <div className="text-center">
                  <BarChart3 className="h-16 w-16 text-teal-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-teal-800">
                    6-Stage Pipeline Architecture
                  </h3>
                  <p className="text-teal-600 text-sm">
                    Data Preparation → Clustering → Regex → BERT → LLM →
                    Integration
                  </p>
                </div>
              </div>

              <div className="prose prose-slate max-w-none">
                <p className="text-slate-600 leading-relaxed">
                  The intelligent routing system dynamically directs log
                  messages through the most appropriate classification stage
                  based on complexity analysis. Simple, pattern-based logs are
                  processed by the high-speed Regex engine, while complex
                  infrastructure failures requiring contextual understanding are
                  routed to the LLM fallback system. This approach optimizes
                  both processing speed and classification accuracy while
                  minimizing computational costs.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Performance & Cost Dashboard Card */}
          <Card className="shadow-lg border-teal-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl text-teal-700">
                <TrendingUp className="h-6 w-6" />
                Key Performance & Cost Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Performance Metrics */}
                <div>
                  <h4 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
                    <Activity className="h-4 w-4" />
                    Performance Metrics
                  </h4>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="text-center p-4 bg-teal-50 rounded-lg border border-teal-200">
                      <div className="text-3xl font-bold text-teal-700">
                        94.3%
                      </div>
                      <div className="text-sm text-slate-600">
                        Classification Accuracy
                      </div>
                    </div>
                    <div className="text-center p-4 bg-teal-50 rounded-lg border border-teal-200">
                      <div className="text-3xl font-bold text-teal-700">
                        92.7%
                      </div>
                      <div className="text-sm text-slate-600">
                        Overall Coverage
                      </div>
                    </div>
                    <div className="text-center p-4 bg-teal-50 rounded-lg border border-teal-200">
                      <div className="text-3xl font-bold text-teal-700">
                        ~260
                      </div>
                      <div className="text-sm text-slate-600">
                        Logs/sec Throughput
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cost Analysis */}
                <div>
                  <h4 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Cost per 1,000 Logs
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                      <span className="text-sm font-medium text-green-800">
                        Regex Processing
                      </span>
                      <span className="text-lg font-bold text-green-700">
                        $0.00
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <span className="text-sm font-medium text-blue-800">
                        BERT Processing
                      </span>
                      <span className="text-lg font-bold text-blue-700">
                        $0.03
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-amber-50 rounded-lg border border-amber-200">
                      <span className="text-sm font-medium text-amber-800">
                        LLM Processing
                      </span>
                      <span className="text-lg font-bold text-amber-700">
                        $0.23
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Engine Stage Breakdown Card */}
          <Card className="shadow-lg border-teal-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl text-teal-700">
                <Cpu className="h-6 w-6" />A Deep Dive into Each Engine Stage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="regex" className="border-teal-200">
                  <AccordionTrigger className="text-left hover:text-teal-700">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-teal-600" />
                      <span>The Regex Engine (42% of workload)</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600">
                    <div className="space-y-2">
                      <p className="font-medium">
                        High-Performance Pattern Matching
                      </p>
                      <ul className="text-sm space-y-1">
                        <li>• Processing Speed: ~1,200 logs/sec</li>
                        <li>• Precision: 99.7%</li>
                        <li>• Coverage: 42% of total logs</li>
                        <li>• Latency: &lt;2ms average</li>
                        <li>• Cost: $0.00 per 1,000 logs</li>
                      </ul>
                      <p className="text-sm">
                        Handles common log patterns with deterministic
                        rule-based classification. Optimized for high-frequency,
                        well-structured log entries.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="bert" className="border-teal-200">
                  <AccordionTrigger className="text-left hover:text-teal-700">
                    <div className="flex items-center gap-2">
                      <Cpu className="h-4 w-4 text-teal-600" />
                      <span>The BERT Model (26% of workload)</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600">
                    <div className="space-y-2">
                      <p className="font-medium">
                        Deep Learning Classification
                      </p>
                      <ul className="text-sm space-y-1">
                        <li>• Processing Speed: ~450 logs/sec</li>
                        <li>• Accuracy: 92.8%</li>
                        <li>• Coverage: 26% of total logs</li>
                        <li>• Latency: ~15ms average</li>
                        <li>• Cost: $0.03 per 1,000 logs</li>
                      </ul>
                      <p className="text-sm">
                        DistilBERT-based model fine-tuned on OpenStack logs.
                        Handles moderate complexity logs requiring semantic
                        understanding.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="llm" className="border-teal-200">
                  <AccordionTrigger className="text-left hover:text-teal-700">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-teal-600" />
                      <span>The LLM Fallback (21% of workload)</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600">
                    <div className="space-y-2">
                      <p className="font-medium">Advanced Reasoning Engine</p>
                      <ul className="text-sm space-y-1">
                        <li>• Processing Speed: ~180 logs/sec</li>
                        <li>• Accuracy: 96.1%</li>
                        <li>• Coverage: 21% of total logs</li>
                        <li>• Latency: ~250ms average</li>
                        <li>• Cost: $0.23 per 1,000 logs</li>
                      </ul>
                      <p className="text-sm">
                        LLaMA 3.1 via Groq API. Handles complex, rare, and
                        multi-faceted infrastructure failures requiring
                        contextual reasoning.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
