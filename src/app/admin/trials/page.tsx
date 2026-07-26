"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, MapPin, Calendar, Loader2 } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import TextArea from "@/components/ui/TextArea";

interface Trial {
  id: string;
  title: string;
  location: string;
  date: string;
  positions: string;
  deadline: string;
  description: string;
  active: boolean;
  createdAt: string;
}

export default function AdminTrialsPage() {
  const [trials, setTrials] = useState<Trial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [form, setForm] = useState({
    title: "", location: "", date: "", deadline: "", positions: "", description: "",
  });

  useEffect(() => {
    fetchTrials();
  }, []);

  async function fetchTrials() {
    setLoading(true);
    try {
      const res = await fetch("/api/trials");
      const data = await res.json();
      setTrials(Array.isArray(data) ? data : []);
    } catch {
      setTrials([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setFormLoading(true);
    try {
      const positions = form.positions.split(",").map((p) => p.trim()).filter(Boolean);
      await fetch("/api/trials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, positions }),
      });
      setForm({ title: "", location: "", date: "", deadline: "", positions: "", description: "" });
      setShowForm(false);
      fetchTrials();
    } catch {
      alert("Failed to create trial");
    } finally {
      setFormLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Trials</h1>
          <p className="text-sm text-gray-400 mt-1">{trials.length} total trials</p>
        </div>
        <Button variant="primary" size="sm" onClick={() => setShowForm(!showForm)}>
          <Plus className="h-4 w-4" />
          Create Trial
        </Button>
      </div>

      {showForm && (
        <Card padding="lg">
          <h3 className="text-sm font-semibold text-white mb-4">New Trial</h3>
          <form onSubmit={handleCreate} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required id="title" placeholder="e.g. Premier League Open Trials" />
              <Input label="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} required id="location" placeholder="e.g. London, UK" />
              <Input label="Trial Date" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required id="date" />
              <Input label="Application Deadline" type="date" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} required id="deadline" />
            </div>
            <Input label="Positions (comma-separated)" value={form.positions} onChange={(e) => setForm({ ...form, positions: e.target.value })} id="positions" placeholder="e.g. striker, midfielder, defender" />
            <TextArea label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} id="description" placeholder="Describe the trial opportunity..." />
            <div className="flex gap-3">
              <Button type="submit" variant="primary" size="sm" loading={formLoading}>
                {formLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                Create
              </Button>
              <Button type="button" variant="ghost" size="sm" onClick={() => setShowForm(false)}>Cancel</Button>
            </div>
          </form>
        </Card>
      )}

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <div className="h-8 w-8 border-2 border-[#0D7B3E] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : trials.length === 0 ? (
        <Card padding="lg" className="text-center">
          <p className="text-gray-500">No trials yet. Create your first trial above.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {trials.map((trial) => {
            let parsedPositions: string[] = [];
            try { parsedPositions = JSON.parse(trial.positions); } catch { parsedPositions = []; }

            return (
              <Card key={trial.id} padding="lg">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-white font-semibold">{trial.title}</h3>
                    <div className="flex items-center gap-3 mt-1 text-sm text-gray-400">
                      <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{trial.location}</span>
                      <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{new Date(trial.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-400 mb-3 line-clamp-2">{trial.description}</p>
                {parsedPositions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {parsedPositions.map((pos, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-full text-xs bg-[#0D7B3E]/10 text-[#0D7B3E]">
                        {pos.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                      </span>
                    ))}
                  </div>
                )}
                <div className="mt-3 text-xs text-gray-500">
                  Deadline: {new Date(trial.deadline).toLocaleDateString()}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
