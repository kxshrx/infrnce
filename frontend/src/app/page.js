"use client";

import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
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

export default function HomePage() {
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
            <Link href="/engine">
              <Button size="lg" className="px-8 py-4 text-lg h-14 group">
                Try the Engine
                <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
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
                href="https://github.com/kxshrx/infrnce"
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

              <Link href="/engine">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full h-16 text-lg group border-primary/20 hover:border-primary"
                >
                  <Zap className="mr-3 h-6 w-6" />
                  Try Engine
                  <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
