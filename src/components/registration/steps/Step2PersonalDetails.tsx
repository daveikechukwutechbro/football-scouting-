"use client";

import { User, Calendar, Globe, MapPin, Phone } from "lucide-react";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { COUNTRIES } from "@/lib/constants";
import type { StepProps } from "@/lib/constants";

export default function Step2PersonalDetails({ data, updateData, errors }: StepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Personal Details</h2>
        <p className="mt-1 text-sm text-gray-400">
          Tell us about yourself so scouts can get to know you.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="First Name"
          placeholder="Enter your first name"
          icon={User}
          value={data.firstName || ""}
          onChange={(e) => updateData({ firstName: e.target.value })}
          error={errors.firstName}
          required
          autoComplete="given-name"
        />
        <Input
          label="Last Name"
          placeholder="Enter your last name"
          icon={User}
          value={data.lastName || ""}
          onChange={(e) => updateData({ lastName: e.target.value })}
          error={errors.lastName}
          required
          autoComplete="family-name"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Date of Birth"
          type="date"
          placeholder="Select your date of birth"
          icon={Calendar}
          value={data.dateOfBirth || ""}
          onChange={(e) => {
            const dob = e.target.value;
            const age = dob
              ? Math.floor(
                  (Date.now() - new Date(dob).getTime()) /
                    (365.25 * 24 * 60 * 60 * 1000)
                )
              : 0;
            updateData({ dateOfBirth: dob, age });
          }}
          error={errors.dateOfBirth}
          required
        />
        <Input
          label="Age"
          type="number"
          placeholder="Auto-calculated"
          value={data.age || ""}
          onChange={() => {}}
          disabled
          helperText="Calculated from date of birth"
        />
      </div>

      <Select
        label="Nationality"
        placeholder="Select your nationality"
        options={COUNTRIES}
        value={data.nationality || ""}
        onChange={(e) => updateData({ nationality: e.target.value })}
        error={errors.nationality}
        required
      />

      <Select
        label="Country of Residence"
        placeholder="Select your country"
        options={COUNTRIES}
        value={data.country || ""}
        onChange={(e) => updateData({ country: e.target.value })}
        error={errors.country}
        required
      />

      <Input
        label="City"
        placeholder="Enter your city"
        icon={MapPin}
        value={data.city || ""}
        onChange={(e) => updateData({ city: e.target.value })}
        error={errors.city}
        required
        autoComplete="address-level2"
      />

      <Input
        label="Phone Number"
        type="tel"
        placeholder="+1 (555) 123-4567"
        icon={Phone}
        value={data.phoneNumber || ""}
        onChange={(e) => updateData({ phoneNumber: e.target.value })}
        error={errors.phoneNumber}
        required
        autoComplete="tel"
      />
    </div>
  );
}
