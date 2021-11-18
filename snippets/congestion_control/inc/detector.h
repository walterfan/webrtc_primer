#ifndef _RTC_DETECTOR_H
#define _RTC_DETECTOR_H


enum class BandwidthUsage {
  kBwNormal = 0,
  kBwUnderusing = 1,
  kBwOverusing = 2,
  kLast
};

class DelayIncreaseDetectorInterface {
 public:
  DelayIncreaseDetectorInterface() {}
  virtual ~DelayIncreaseDetectorInterface() {}

  // Update the detector with a new sample. The deltas should represent deltas
  // between timestamp groups as defined by the InterArrival class.
  virtual void Update(double recv_delta_ms,
                      double send_delta_ms,
                      int64_t send_time_ms,
                      int64_t arrival_time_ms,
                      size_t packet_size,
                      bool calculated_deltas) = 0;

  virtual BandwidthUsage State() const = 0;

  //RTC_DISALLOW_COPY_AND_ASSIGN(DelayIncreaseDetectorInterface);
  DelayIncreaseDetectorInterface& operator = (const DelayIncreaseDetectorInterface &) = delete;  
  DelayIncreaseDetectorInterface(const DelayIncreaseDetectorInterface&) = delete;      

};

class RtcDetector {
public:
    void Init();
};

#endif