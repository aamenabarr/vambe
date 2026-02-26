"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import type { Lead } from "@/lib/types";
import { tLabel } from "@/lib/translations";

interface LeadDetailModalProps {
  lead: Lead | null;
  open: boolean;
  onClose: () => void;
}

const scoreColors: Record<string, string> = {
  HOT: "bg-green-500/20 text-green-400 border-green-500/30",
  WARM: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  COLD: "bg-blue-500/20 text-blue-400 border-blue-500/30",
};

export function LeadDetailModal({ lead, open, onClose }: LeadDetailModalProps) {
  if (!lead) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto bg-[#111128] border-white/10">
        <DialogHeader>
          <DialogTitle className="text-xl">{lead.name}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <Section title="Contacto">
            <Info label="Email" value={lead.email} />
            <Info label="Teléfono" value={lead.phone || "—"} />
          </Section>

          <Section title="Comercial">
            <Info label="Vendedor" value={lead.salesAgent.name} />
            <Info
              label="Fecha Reunión"
              value={new Date(lead.meetingDate).toLocaleDateString("es-CL")}
            />
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Estado:</span>
              <Badge variant={lead.isClosed ? "default" : "secondary"}>
                {lead.isClosed ? "Cerrado" : "Abierto"}
              </Badge>
            </div>
            {lead.leadScore && (
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Score:</span>
                <Badge className={scoreColors[lead.leadScore] || ""}>
                  {tLabel(lead.leadScore)}
                </Badge>
              </div>
            )}
          </Section>
        </div>

        {lead.leadStatus === "PROCESSED" && (
          <>
            <div className="grid grid-cols-2 gap-4 text-sm mt-2">
              <Section title="Categorías IA">
                <Info label="Industria" value={lead.industry ? tLabel(lead.industry) : "—"} />
                <Info label="Tamaño" value={lead.companySize ? tLabel(lead.companySize) : "—"} />
                <Info
                  label="Fuente"
                  value={lead.discoverySource ? tLabel(lead.discoverySource) : "—"}
                />
              </Section>

              <Section title="Pain Points">
                <div className="flex flex-wrap gap-1">
                  {lead.mainPainPoints?.map((pp) => (
                    <Badge key={pp} variant="outline" className="text-xs border-white/20">
                      {tLabel(pp)}
                    </Badge>
                  )) || <span className="text-muted-foreground">—</span>}
                </div>
              </Section>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm mt-2">
              <Section title="Integraciones">
                <div className="flex flex-wrap gap-1">
                  {lead.integrations?.map((i) => (
                    <Badge key={i} variant="outline" className="text-xs border-white/20">
                      {tLabel(i)}
                    </Badge>
                  )) || <span className="text-muted-foreground">—</span>}
                </div>
              </Section>

              <Section title="Oportunidades">
                <div className="flex flex-wrap gap-1">
                  {lead.opportunities?.map((o) => (
                    <Badge key={o} variant="outline" className="text-xs border-white/20">
                      {tLabel(o)}
                    </Badge>
                  )) || <span className="text-muted-foreground">—</span>}
                </div>
              </Section>
            </div>
          </>
        )}

        <Section title="Transcripción">
          <div className="bg-black/30 rounded-lg p-4 max-h-48 overflow-y-auto text-sm text-muted-foreground leading-relaxed">
            {lead.transcript}
          </div>
        </Section>
      </DialogContent>
    </Dialog>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-sm text-primary">{title}</h3>
      {children}
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <p>
      <span className="text-muted-foreground">{label}:</span>{" "}
      <span className="text-foreground">{value}</span>
    </p>
  );
}
