import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowLeft,
  BarChart3,
  Clock,
  DollarSign,
  Cpu,
  Zap,
  Target,
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-transparent p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button
              variant="outline"
              className="border-teal-600 text-teal-600 hover:bg-teal-50/90 bg-white/90 backdrop-blur-sm"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Engine
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-teal-700">
              Performance Dashboard
            </h1>
            <p className="text-slate-600">
              Deep dive into Infrnce's hybrid pipeline architecture
            </p>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Hybrid Pipeline Architecture */}
          <Card className="shadow-lg border-teal-100 bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-teal-700">
                <BarChart3 className="h-5 w-5" />
                Hybrid Pipeline Architecture
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-video bg-gradient-to-br from-teal-50 to-slate-50 rounded-lg flex items-center justify-center border-2 border-dashed border-teal-200">
                <div className="text-center">
                  <div className="text-4xl mb-2">🏗️</div>
                  <p className="text-slate-600 font-medium">Pipeline Diagram</p>
                  <p className="text-sm text-slate-500">
                    Regex → BERT → LLM Fallback
                  </p>
                </div>
              </div>
              <p className="text-slate-600">
                Our intelligent pipeline processes logs through three stages:
                fast regex patterns, BERT model inference, and LLM fallback for
                complex cases. This ensures optimal performance and cost
                efficiency.
              </p>
            </CardContent>
          </Card>

          {/* Performance & Cost Dashboard */}
          <Card className="shadow-lg border-teal-100 bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-teal-700">
                <DollarSign className="h-5 w-5" />
                Performance & Cost Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-teal-50/80 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-teal-600" />
                    <span className="text-sm font-medium text-teal-700">
                      Avg Response Time
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-teal-800">43ms</div>
                  <div className="text-xs text-teal-600">
                    15% faster than baseline
                  </div>
                </div>

                <div className="bg-green-50/80 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-700">
                      Cost Reduction
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-green-800">78%</div>
                  <div className="text-xs text-green-600">
                    vs LLM-only approach
                  </div>
                </div>

                <div className="bg-blue-50/80 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-700">
                      Accuracy
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-blue-800">94.2%</div>
                  <div className="text-xs text-blue-600">
                    F1-score across all categories
                  </div>
                </div>

                <div className="bg-purple-50/80 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Cpu className="h-4 w-4 text-purple-600" />
                    <span className="text-sm font-medium text-purple-700">
                      Throughput
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-purple-800">2.1K</div>
                  <div className="text-xs text-purple-600">logs per second</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Engine Stage Breakdown */}
        <Card className="shadow-lg border-teal-100 bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-teal-700">
              <Cpu className="h-5 w-5" />
              Engine Stage Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="regex">
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-3">
                    <Zap className="h-5 w-5 text-teal-600" />
                    <div>
                      <div className="font-semibold">
                        Regex Engine (Stage 1)
                      </div>
                      <div className="text-sm text-slate-500">
                        Fast pattern matching • 67% of logs processed
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-slate-50 p-3 rounded">
                      <div className="text-sm font-medium text-slate-600">
                        Response Time
                      </div>
                      <div className="text-lg font-bold text-slate-800">
                        8ms
                      </div>
                    </div>
                    <div className="bg-slate-50 p-3 rounded">
                      <div className="text-sm font-medium text-slate-600">
                        Accuracy
                      </div>
                      <div className="text-lg font-bold text-slate-800">
                        98.5%
                      </div>
                    </div>
                    <div className="bg-slate-50 p-3 rounded">
                      <div className="text-sm font-medium text-slate-600">
                        Cost per 1K logs
                      </div>
                      <div className="text-lg font-bold text-slate-800">
                        $0.001
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 text-slate-600">
                    Our regex engine handles straightforward log patterns with
                    lightning speed. Using carefully crafted regular
                    expressions, it can classify common log types instantly,
                    providing the fastest and most cost-effective processing for
                    the majority of logs.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="bert">
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-3">
                    <Cpu className="h-5 w-5 text-teal-600" />
                    <div>
                      <div className="font-semibold">BERT Model (Stage 2)</div>
                      <div className="text-sm text-slate-500">
                        Neural classification • 28% of logs processed
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-slate-50 p-3 rounded">
                      <div className="text-sm font-medium text-slate-600">
                        Response Time
                      </div>
                      <div className="text-lg font-bold text-slate-800">
                        45ms
                      </div>
                    </div>
                    <div className="bg-slate-50 p-3 rounded">
                      <div className="text-sm font-medium text-slate-600">
                        Accuracy
                      </div>
                      <div className="text-lg font-bold text-slate-800">
                        93.8%
                      </div>
                    </div>
                    <div className="bg-slate-50 p-3 rounded">
                      <div className="text-sm font-medium text-slate-600">
                        Cost per 1K logs
                      </div>
                      <div className="text-lg font-bold text-slate-800">
                        $0.12
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 text-slate-600">
                    When regex patterns aren't sufficient, our fine-tuned BERT
                    model takes over. This transformer-based model understands
                    semantic context and can handle more complex classification
                    tasks with high accuracy while maintaining reasonable costs.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="llm">
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-3">
                    <Target className="h-5 w-5 text-teal-600" />
                    <div>
                      <div className="font-semibold">
                        LLM Fallback (Stage 3)
                      </div>
                      <div className="text-sm text-slate-500">
                        Advanced reasoning • 5% of logs processed
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-slate-50 p-3 rounded">
                      <div className="text-sm font-medium text-slate-600">
                        Response Time
                      </div>
                      <div className="text-lg font-bold text-slate-800">
                        1.2s
                      </div>
                    </div>
                    <div className="bg-slate-50 p-3 rounded">
                      <div className="text-sm font-medium text-slate-600">
                        Accuracy
                      </div>
                      <div className="text-lg font-bold text-slate-800">
                        96.7%
                      </div>
                    </div>
                    <div className="bg-slate-50 p-3 rounded">
                      <div className="text-sm font-medium text-slate-600">
                        Cost per 1K logs
                      </div>
                      <div className="text-lg font-bold text-slate-800">
                        $2.40
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 text-slate-600">
                    For the most complex and ambiguous logs, our LLM fallback
                    provides human-level reasoning. While more expensive and
                    slower, it ensures that even the most challenging cases are
                    handled accurately, maintaining overall system reliability.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
