import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import { Badge } from "../../components/ui/badge";
import {
  BarChart3,
  Clock,
  Zap,
  TrendingUp,
  Activity,
  DollarSign,
  GitBranch,
  Code,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          {/* <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
            <Activity className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Live Performance Data
            </span>
          </div> */}
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Performance Dashboard
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Real-time analytics and comprehensive insights into the Infrnce
            classification engine performance
          </p>
        </div>

        {/* Pipeline Architecture Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Stage 1: Regex */}
          <Card className="relative group cursor-pointer hover:shadow-lg transition-all border-l-4 border-l-primary">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
                  <GitBranch className="h-6 w-6 text-primary" />
                </div>
                <Badge
                  variant="secondary"
                  className="bg-primary/10 text-primary"
                >
                  42% load
                </Badge>
              </div>
              <CardTitle className="text-lg">Stage 1: Regex Engine</CardTitle>
              <CardDescription>Lightning-fast pattern matching</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Handles standard infrastructure logs with millisecond response
                times using optimized regex patterns.
              </p>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <Clock className="h-3 w-3 text-primary" />
                  <span className="text-muted-foreground">Response:</span>
                  <span className="font-medium">&lt;1ms</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3 w-3 text-primary" />
                  <span className="text-muted-foreground">Accuracy:</span>
                  <span className="font-medium">98.7%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stage 2: BERT */}
          <Card className="relative group cursor-pointer hover:shadow-lg transition-all border-l-4 border-l-amber-500">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-500/10 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-amber-600" />
                </div>
                <Badge
                  variant="secondary"
                  className="bg-amber-500/10 text-amber-600"
                >
                  26% load
                </Badge>
              </div>
              <CardTitle className="text-lg">Stage 2: BERT Model</CardTitle>
              <CardDescription>Contextual understanding AI</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Fine-tuned transformer for complex application logs and
                multi-line error messages.
              </p>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <Clock className="h-3 w-3 text-amber-600" />
                  <span className="text-muted-foreground">Response:</span>
                  <span className="font-medium">~50ms</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3 w-3 text-amber-600" />
                  <span className="text-muted-foreground">Accuracy:</span>
                  <span className="font-medium">95.2%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stage 3: LLM */}
          <Card className="relative group cursor-pointer hover:shadow-lg transition-all border-l-4 border-l-red-500">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-red-500/10 rounded-lg">
                  <Code className="h-6 w-6 text-red-600" />
                </div>
                <Badge
                  variant="secondary"
                  className="bg-red-500/10 text-red-600"
                >
                  21% load
                </Badge>
              </div>
              <CardTitle className="text-lg">Stage 3: LLM Fallback</CardTitle>
              <CardDescription>Advanced reasoning engine</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Handles highly complex, novel, or ambiguous log entries with
                advanced AI reasoning.
              </p>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <Clock className="h-3 w-3 text-red-600" />
                  <span className="text-muted-foreground">Response:</span>
                  <span className="font-medium">~200ms</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3 w-3 text-red-600" />
                  <span className="text-muted-foreground">Accuracy:</span>
                  <span className="font-medium">96.8%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analytics Grid */}
        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2 mb-12">
          {/* Architecture Deep Dive */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                  <Activity className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Intelligent Routing Architecture</CardTitle>
                  <CardDescription>
                    Multi-tiered classification pipeline optimized for speed and
                    accuracy
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-br from-muted/50 to-muted/20 rounded-lg p-8 mb-6 text-center border border-primary/10">
                <div className="text-muted-foreground text-sm mb-4 font-medium">
                  Pipeline Flow Visualization
                </div>
                <div className="h-40 bg-background/50 rounded border-2 border-dashed border-primary/20 flex items-center justify-center backdrop-blur-sm">
                  <span className="text-muted-foreground font-medium">
                    Regex → BERT → LLM Pipeline
                  </span>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Our intelligent routing system directs log messages through a
                sophisticated multi-tiered classification pipeline. Simple
                patterns are handled by lightning-fast regex engines, while
                complex logs are escalated to BERT models and, when necessary,
                to advanced LLM processing. This approach optimizes both speed
                and accuracy while maintaining exceptional cost efficiency
                across the entire classification workflow.
              </p>
            </CardContent>
          </Card>

          {/* Performance & Cost Dashboard */}
          <Card className="border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Performance & Cost Metrics</CardTitle>
                  <CardDescription>
                    Real-time performance indicators and cost analysis
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                {/* Performance Metrics */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-sm text-primary uppercase tracking-wide flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    Performance
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-2 bg-muted/30 rounded">
                      <span className="text-sm text-muted-foreground">
                        Classification Accuracy
                      </span>
                      <span className="text-lg font-bold text-foreground">
                        94.3%
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-muted/30 rounded">
                      <span className="text-sm text-muted-foreground">
                        Overall Coverage
                      </span>
                      <span className="text-lg font-bold text-foreground">
                        92.7%
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-muted/30 rounded">
                      <span className="text-sm text-muted-foreground">
                        Logs/sec Throughput
                      </span>
                      <span className="text-lg font-bold text-foreground">
                        ~260
                      </span>
                    </div>
                  </div>
                </div>

                {/* Cost Analysis */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-sm text-primary uppercase tracking-wide flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Cost Analysis
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-2 bg-muted/30 rounded">
                      <span className="text-sm text-muted-foreground">
                        Regex/1k logs
                      </span>
                      <span className="text-lg font-bold text-green-600">
                        $0.00
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-muted/30 rounded">
                      <span className="text-sm text-muted-foreground">
                        BERT/1k logs
                      </span>
                      <span className="text-lg font-bold text-amber-600">
                        $0.03
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-muted/30 rounded">
                      <span className="text-sm text-muted-foreground">
                        LLM/1k logs
                      </span>
                      <span className="text-lg font-bold text-red-600">
                        $0.23
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Engine Stage Breakdown */}
          <Card className="border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                  <BarChart3 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Engine Stage Deep Dive</CardTitle>
                  <CardDescription>
                    Detailed workload distribution and stage capabilities
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="regex" className="border-primary/10">
                  <AccordionTrigger className="text-left hover:text-primary">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-primary rounded-full"></div>
                      <span>The Regex Engine (42% of workload)</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pt-4">
                    <p className="leading-relaxed mb-4">
                      The first-line defense handles standard infrastructure
                      patterns with millisecond response times. Processes common
                      log formats including Apache, Nginx, syslog, and
                      application errors. Achieves 98.7% accuracy on
                      pattern-based classifications with zero computational
                      cost, making it the most efficient stage in our pipeline.
                    </p>
                    <div className="grid grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <span className="font-medium">
                          Response Time: &lt;1ms
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        <span className="font-medium">Accuracy: 98.7%</span>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="bert" className="border-primary/10">
                  <AccordionTrigger className="text-left hover:text-primary">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                      <span>The BERT Model (26% of workload)</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pt-4">
                    <p className="leading-relaxed mb-4">
                      Fine-tuned transformer model specializing in contextual
                      log understanding. Handles complex application logs, stack
                      traces, and multi-line error messages that escape regex
                      patterns. Balances accuracy and performance with 50ms
                      average processing time and 95.2% classification accuracy.
                    </p>
                    <div className="grid grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-amber-500" />
                        <span className="font-medium">
                          Response Time: ~50ms
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-amber-500" />
                        <span className="font-medium">Accuracy: 95.2%</span>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="llm" className="border-primary/10">
                  <AccordionTrigger className="text-left hover:text-primary">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span>The LLM Fallback (21% of workload)</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pt-4">
                    <p className="leading-relaxed mb-4">
                      Advanced reasoning engine for highly complex, novel, or
                      ambiguous log entries. Leverages large language models to
                      understand context, technical terminology, and nuanced
                      error conditions. Reserved for the most challenging cases,
                      ensuring comprehensive coverage across all log types.
                    </p>
                    <div className="grid grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-red-500" />
                        <span className="font-medium">
                          Response Time: ~200ms
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-red-500" />
                        <span className="font-medium">Accuracy: 96.8%</span>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
        {/* Key Metrics Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center p-6 border-primary/20 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mx-auto mb-3">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">94.3%</div>
            <div className="text-sm text-muted-foreground">
              Overall Accuracy
            </div>
          </Card>

          <Card className="text-center p-6 border-primary/20 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mx-auto mb-3">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">23ms</div>
            <div className="text-sm text-muted-foreground">Avg Response</div>
          </Card>

          <Card className="text-center p-6 border-primary/20 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mx-auto mb-3">
              <Activity className="h-6 w-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">260/s</div>
            <div className="text-sm text-muted-foreground">Throughput</div>
          </Card>

          <Card className="text-center p-6 border-primary/20 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mx-auto mb-3">
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">
              $0.018
            </div>
            <div className="text-sm text-muted-foreground">Cost/1k logs</div>
          </Card>
        </div>
      </div>
    </div>
  );
}
