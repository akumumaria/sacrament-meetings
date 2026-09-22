'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export function MeetingTypeFilter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const meetingTypes = [
    { value: '', label: 'All' },
    { value: 'testimony', label: 'Testimony' },
    { value: 'regular', label: 'Regular' },
    { value: 'stake', label: 'Stake' },
    { value: 'general', label: 'General' },
    { value: 'special', label: 'Special' },
  ];

  const currentType = searchParams.get('type') || '';

  const handleFilter = (type: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1'); // reset to page 1 on filter change
    if (type) {
      params.set('type', type);
    } else {
      params.delete('type');
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {meetingTypes.map((type) => (
        <button
          key={type.value}
          onClick={() => handleFilter(type.value)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            currentType === type.value
              ? 'bg-primary text-primary-foreground'
              : 'bg-card text-foreground border border-border hover:bg-border'
          }`}
        >
          {type.label}
        </button>
      ))}
    </div>
  );
}
