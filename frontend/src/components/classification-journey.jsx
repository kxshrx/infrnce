import { Badge } from "./ui/badge";
import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

const ClassificationJourney = ({ journey }) => {
  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "classified":
      case "matched":
        return <CheckCircle2 className="h-3 w-3" />;
      case "low confidence":
        return <AlertTriangle className="h-3 w-3" />;
      case "skipped":
      case "not required":
        return <XCircle className="h-3 w-3" />;
      default:
        return <XCircle className="h-3 w-3" />;
    }
  };

  const getStatusVariant = (status) => {
    switch (status.toLowerCase()) {
      case "classified":
      case "matched":
        return "default"; // Uses primary teal color
      case "low confidence":
        return "outline"; // Amber/yellow styling
      case "skipped":
      case "not required":
        return "secondary"; // Neutral gray
      default:
        return "secondary";
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "low confidence":
        return "border-amber-300 text-amber-700 bg-amber-50";
      default:
        return "";
    }
  };

  if (!journey || !Array.isArray(journey)) {
    return null;
  }

  return (
    <div className="mt-4">
      <div className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
        Classification Journey
      </div>
      <div className="flex flex-wrap gap-2">
        {journey.map((stage, index) => (
          <Badge
            key={index}
            variant={getStatusVariant(stage.status)}
            className={`flex items-center gap-1.5 ${
              stage.status.toLowerCase() === "low confidence"
                ? getStatusColor(stage.status)
                : ""
            }`}
            title={stage.details || `${stage.stage}: ${stage.status}`}
          >
            {getStatusIcon(stage.status)}
            <span className="text-xs">{stage.stage}</span>
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default ClassificationJourney;
