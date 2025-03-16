/** @format */

'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { countryOptions, universityInMelbourne } from '@/lib/constants';
import { getHobbies } from '@/app/actions/hobbies';
import { HobbyTag } from '@prisma/client';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { FormEvent } from 'react';

interface FormData {
  country: string;
  university: string;
  groupPreference: string;
  hobbies: string[];
}

export function OnboardingForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [allHobbies, setAllHobbies] = useState<HobbyTag[]>([]);
  const [formData, setFormData] = useState<FormData>({
    country: '',
    university: '',
    groupPreference: '',
    hobbies: [],
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  useEffect(() => {
    getHobbies().then(setAllHobbies);
  }, []);

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.country) {
      newErrors.country = 'Please select your country.';
    }
    if (!formData.university) {
      newErrors.university = 'Please select your university.';
    }
    if (!formData.groupPreference) {
      newErrors.groupPreference = 'Please select your group preference.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Add your form submission logic here
      console.log(formData);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleHobbyToggle = (hobbyId: string) => {
    setFormData((prev) => ({
      ...prev,
      hobbies: prev.hobbies.includes(hobbyId)
        ? prev.hobbies.filter((id) => id !== hobbyId)
        : [...prev.hobbies, hobbyId],
    }));
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      <div className='space-y-2 '>
        <Label htmlFor='country' className='text-lg '>
          Which country are you from?
        </Label>
        <Select
          value={formData.country}
          onValueChange={(value) =>
            setFormData((prev) => ({ ...prev, country: value }))
          }
        >
          <SelectTrigger className='w-full p-5'>
            <SelectValue placeholder='Select your country' />
          </SelectTrigger>
          <SelectContent>
            {countryOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.country && (
          <p className='text-sm text-destructive'>{errors.country}</p>
        )}
      </div>

      <div className='space-y-2'>
        <Label htmlFor='university' className='text-lg '>
          Which university do you attend?
        </Label>
        <Select
          value={formData.university}
          onValueChange={(value) =>
            setFormData((prev) => ({ ...prev, university: value }))
          }
        >
          <SelectTrigger className='w-full p-5'>
            <SelectValue placeholder='Select your university' />
          </SelectTrigger>
          <SelectContent>
            {universityInMelbourne.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.university && (
          <p className='text-sm text-destructive'>{errors.university}</p>
        )}
      </div>

      <div className='space-y-2'>
        <Label htmlFor='groupPreference' className='text-lg '>
          What&apos;s your group preference?
        </Label>
        <Select
          value={formData.groupPreference}
          onValueChange={(value) =>
            setFormData((prev) => ({ ...prev, groupPreference: value }))
          }
        >
          <SelectTrigger className='w-full p-5'>
            <SelectValue placeholder='Select your preference' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='same-country'>Same Country</SelectItem>
            <SelectItem value='same-university'>Same University</SelectItem>
            <SelectItem value='mixed'>Mixed Group</SelectItem>
            <SelectItem value='single'>Explore by myself</SelectItem>
            <SelectItem value='yolo'>YOLO</SelectItem>
          </SelectContent>
        </Select>
        {errors.groupPreference && (
          <p className='text-sm text-destructive'>{errors.groupPreference}</p>
        )}
      </div>

      <div className='space-y-2'>
        <Label className='text-lg '>What are your hobbies?</Label>
        <ul className='flex flex-wrap gap-4 mt-1'>
          {allHobbies.map((hobby) => (
            <li key={hobby.id} className='flex items-center gap-2'>
              <Checkbox
                onClick={() => handleHobbyToggle(hobby.id)}
                value={hobby.id}
                id={hobby.id}
              />
              <Label htmlFor={hobby.id}>{hobby.name}</Label>
            </li>
          ))}
        </ul>
      </div>

      <Link href='/home'>
        <Button type='submit' className='w-full p-5' disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Continue'}
        </Button>
      </Link>
    </form>
  );
}
