"use client";

import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  CheckCircle,
  Clock,
  XCircle,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";

export default function PipelineJourney({ journey = [] }) {
  const getStageIcon = (stage, status) => {
    const iconProps = { size: 20 };

    if (status === "Classified" || status === "Matched") {
      return <CheckCircle className="text-green-600" {...iconProps} />;
    } else if (status === "Low Confidence") {
      return <AlertTriangle className="text-yellow-600" {...iconProps} />;
    } else if (status === "Skipped" || status === "Not Required") {
      return <XCircle className="text-gray-400" {...iconProps} />;
    } else {
      return <Clock className="text-blue-600" {...iconProps} />;
    }
  };

  const getStageColor = (status) => {
    if (status === "Classified" || status === "Matched") {
      return "bg-green-100 text-green-800 border-green-200";
    } else if (status === "Low Confidence") {
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    } else if (status === "Skipped" || status === "Not Required") {
      return "bg-gray-100 text-gray-600 border-gray-200";
    } else {
      return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  if (!journey || journey.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        Pipeline Journey
      </h3>
      <div className="flex items-center justify-between space-x-4 overflow-x-auto pb-2">
        {journey.map((step, index) => (
          <div key={index} className="flex items-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className={`
                    flex flex-col items-center min-w-[120px] p-3 rounded-lg border-2 
                    ${getStageColor(
                      step.status
                    )} hover:shadow-md transition-all cursor-help
                  `}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      {getStageIcon(step.stage, step.status)}
                      <Badge variant="outline" className="text-xs font-medium">
                        {step.stage}
                      </Badge>
                    </div>
                    <span className="text-xs font-medium text-center">
                      {step.status}
                    </span>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="max-w-xs">
                  <div className="text-sm">
                    <p className="font-semibold">{step.stage}</p>
                    <p className="text-gray-600">{step.details}</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {index < journey.length - 1 && (
              <ArrowRight className="text-gray-400 mx-2" size={16} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
