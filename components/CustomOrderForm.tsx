const INPUT_CLASS =
  "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-md text-white placeholder:text-white/40 focus:outline-none focus:border-accent/60 hover:bg-white/10 transition-colors";

const SELECT_CLASS = `${INPUT_CLASS} appearance-none [&>option]:bg-[#1a1a1a] [&>option]:text-white`;

const FILE_INPUT_CLASS =
  "w-full text-white/70 text-sm file:mr-4 file:py-2.5 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-accent/20 file:text-gold hover:file:bg-accent/30 file:cursor-pointer file:transition-colors";

const LENGTHS = [
  '10"',
  '12"',
  '14"',
  '16"',
  '18"',
  '20"',
  '22"',
  '24"',
  '26"',
  '28"',
  '30"',
  '32"',
  '34"',
  '36"',
  '38"',
  '40"',
] as const;

const TEXTURES = [
  "Straight",
  "Body Wave",
  "Deep Wave",
  "Water Wave",
  "Loose Wave",
  "Jerry Curly",
  "Kinky Curly",
  "Kinky Straight",
] as const;

const LACE_TYPES = ["5x5", "13x4", "360", "HD", "No preference"] as const;

function ChevronDown() {
  return (
    <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/40">
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </span>
  );
}

function FieldLabel({
  htmlFor,
  required,
  children,
}: {
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block text-sm text-white/70 mb-1.5">
      {children}
      {required && <span className="text-gold"> *</span>}
    </label>
  );
}

function SelectField({
  id,
  name,
  placeholder,
  options,
}: {
  id: string;
  name: string;
  placeholder: string;
  options: readonly string[];
}) {
  return (
    <div className="relative">
      <select id={id} name={name} defaultValue="" className={SELECT_CLASS}>
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
        <option value="Other">Other</option>
      </select>
      <ChevronDown />
    </div>
  );
}

export default function CustomOrderForm() {
  return (
    <form className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <FieldLabel htmlFor="fullName" required>
            Full Name
          </FieldLabel>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            className={INPUT_CLASS}
            placeholder="Your full name"
          />
        </div>
        <div>
          <FieldLabel htmlFor="email" required>
            Email
          </FieldLabel>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={INPUT_CLASS}
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div>
        <FieldLabel htmlFor="phone">Phone (optional)</FieldLabel>
        <input
          id="phone"
          name="phone"
          type="tel"
          className={INPUT_CLASS}
          placeholder="(555) 123-4567"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <FieldLabel htmlFor="desiredLength">Desired Length</FieldLabel>
          <SelectField
            id="desiredLength"
            name="desiredLength"
            placeholder="Select length..."
            options={LENGTHS}
          />
        </div>
        <div>
          <FieldLabel htmlFor="desiredTexture">Desired Texture</FieldLabel>
          <SelectField
            id="desiredTexture"
            name="desiredTexture"
            placeholder="Select texture..."
            options={TEXTURES}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <FieldLabel htmlFor="desiredColor">Desired Color</FieldLabel>
          <input
            id="desiredColor"
            name="desiredColor"
            type="text"
            className={INPUT_CLASS}
            placeholder="e.g., Natural Black, #613 Blonde"
          />
        </div>
        <div>
          <FieldLabel htmlFor="lacePreference">Lace Preference</FieldLabel>
          <div className="relative">
            <select
              id="lacePreference"
              name="lacePreference"
              defaultValue=""
              className={SELECT_CLASS}
            >
              <option value="" disabled>
                Select lace type...
              </option>
              {LACE_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <ChevronDown />
          </div>
        </div>
      </div>

      <div>
        <FieldLabel htmlFor="referencePhoto">
          Reference Photo (optional, max 10MB)
        </FieldLabel>
        <input
          id="referencePhoto"
          name="referencePhoto"
          type="file"
          accept="image/*"
          className={FILE_INPUT_CLASS}
        />
      </div>

      <div>
        <FieldLabel htmlFor="description">Additional Details</FieldLabel>
        <textarea
          id="description"
          name="description"
          rows={4}
          className={`${INPUT_CLASS} resize-none`}
          placeholder="Describe what you're looking for in detail..."
        />
      </div>

      <button
        type="submit"
        className="w-full py-4 bg-accent text-cream font-semibold text-lg rounded-md hover:bg-gold hover:text-black transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Submit Custom Order Request
      </button>
    </form>
  );
}
