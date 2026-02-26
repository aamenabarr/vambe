"use client";

import { useState, useEffect, useCallback } from "react";
import type { Lead, ProcessingStatus } from "@/lib/types";

export function useLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingStatus, setProcessingStatus] = useState<ProcessingStatus | null>(null);
  const [isPolling, setIsPolling] = useState(false);

  const fetchLeads = useCallback(async () => {
    try {
      const res = await fetch("/api/leads");
      const data = await res.json();
      setLeads(data);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchStatus = useCallback(async () => {
    const res = await fetch("/api/leads?status=true");
    const data: ProcessingStatus = await res.json();
    setProcessingStatus(data);
    return data;
  }, []);

  const startProcessing = useCallback(async () => {
    setProcessingStatus({ total: 0, processed: 0, pending: 0 });
    await fetch("/api/process", { method: "POST" });
    const status = await fetchStatus();
    setProcessingStatus(status);
    setIsPolling(true);
  }, [fetchStatus]);

  const uploadCSV = useCallback(async (file: File) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    await fetch("/api/upload", { method: "POST", body: formData });
    await fetchLeads();
    await startProcessing();
  }, [fetchLeads, startProcessing]);

  useEffect(() => {
    fetchLeads().then(fetchStatus).then((status) => {
      if (status && status.pending > 0) {
        startProcessing();
      }
    });
  }, [fetchLeads, fetchStatus, startProcessing]);

  useEffect(() => {
    if (!isPolling) return;

    const interval = setInterval(async () => {
      const status = await fetchStatus();
      if (status.pending === 0) {
        await fetchLeads();
        setProcessingStatus(status);
        setIsPolling(false);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isPolling, fetchStatus, fetchLeads]);

  return { leads, loading, processingStatus, uploadCSV, isPolling };
}
