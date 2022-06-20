using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StepHustler.Models
{
    public struct Rates
    {
        public DateTime Timestamp { get; set; }
        public float Open { get; set; }
        public float High { get; set; }
        public float Low { get; set; }
        public float Close { get; set; }
        public Rates(string[] data)
        {
            Timestamp = Convert.ToDateTime($"{data[0]} {data[1]}"); 
            
            Open = float.Parse(data[2], CultureInfo.InvariantCulture.NumberFormat);
            High = float.Parse(data[3], CultureInfo.InvariantCulture.NumberFormat);
            Low = float.Parse(data[4], CultureInfo.InvariantCulture.NumberFormat);
            Close = float.Parse(data[5], CultureInfo.InvariantCulture.NumberFormat);
        }
        public float[] ToFloatArray(float? maxValue = null)
        {
            if(maxValue.HasValue)
                return new float[] { Open / (float)maxValue * 100 , High / (float)maxValue * 100, Low / (float)maxValue * 100, Close / (float)maxValue * 100 };
            else
                return new float[] { Open, High, Low, Close };
        }
        public Rates FromPercentage(float? maxValue = null)
        {
            if(maxValue.HasValue)
                return new Rates() { Timestamp = Timestamp, Open = Open / 100 * (float)maxValue, High = High / 100 * (float)maxValue, Low = Low / 100 * (float)maxValue, Close = Close / 100 * (float)maxValue };
            else
                return new Rates() { Timestamp = Timestamp, Open = Open, High = High, Low = Low, Close = Close };
        }
        public Rates ToPercentage(float? maxValue = null)
        {
            if (maxValue.HasValue)
                return new Rates() { Timestamp = Timestamp, Open = Open / (float)maxValue * 100, High = High / (float)maxValue * 100, Low = Low / (float)maxValue * 100, Close = Close / (float)maxValue * 100 };
            else
                return new Rates() { Timestamp = Timestamp, Open = Open, High = High, Low = Low, Close = Close };
        }
        public override bool Equals(object obj)
        {
            return obj is Rates rates && rates.Timestamp == Timestamp;
        }
        public override int GetHashCode()
        {
            return Timestamp.GetHashCode();
        }
    }
}
